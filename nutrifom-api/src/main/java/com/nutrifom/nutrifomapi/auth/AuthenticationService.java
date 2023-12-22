package com.nutrifom.nutrifomapi.auth;

import java.time.LocalDate;
import java.util.Collections;

import com.nutrifom.nutrifomapi.Weight.WeightService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.config.JwtService;
import com.nutrifom.nutrifomapi.token.Token;
import com.nutrifom.nutrifomapi.token.TokenRepository;
import com.nutrifom.nutrifomapi.token.TokenType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository appUserRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final WeightService weightService;

    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new GsonFactory();
    private static final String CLIENT_ID = "286231394640-t7gi95sph1bu8v19sq8khp83c0bi3h61.apps.googleusercontent.com";

    public AuthenticationResponse register(RegisterRequest request) {

        if (appUserRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new CustomAuthenticationException("User already exists", HttpStatus.BAD_REQUEST);
        }

        if (request.getGoogleIDToken() != null) {
            if (!verifyGoogleIDToken(request.getGoogleIDToken())) {
                // Token ist ungültig
                throw new CustomAuthenticationException("Invalid GoogleID Token", HttpStatus.BAD_REQUEST);
            }
        }

        if (request.getPassword() == null) {
            var user = AppUser.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password((request.getPassword()))
                    .dob(request.getDob())
                    .initialWeight(request.getInitialWeight())
                    .goal(request.getGoal())
                    .gender(request.getGender())
                    .height(request.getHeight())
                    .pal(request.getPal())
                    .wpa(request.getWpa())
                    .image(request.getImage())
                    .build();
            var savedUser = appUserRepository.save(user);
            var jwtToken = jwtService.generateJwt(user);
            saveUserToken(savedUser, jwtToken);
            weightService.addOrUpdateWeightEntry(savedUser, request.getInitialWeight(), LocalDate.now());
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } else {
            try {
                var user = AppUser.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .dob(request.getDob())
                        .initialWeight(request.getInitialWeight())
                        .goal(request.getGoal())
                        .gender(request.getGender())
                        .height(request.getHeight())
                        .pal(request.getPal())
                        .wpa(request.getWpa())
                        .image(request.getImage())
                        .build();
                var savedUser = appUserRepository.save(user);
                var jwtToken = jwtService.generateJwt(user);
                saveUserToken(savedUser, jwtToken);
                weightService.addOrUpdateWeightEntry(savedUser, request.getInitialWeight(), LocalDate.now());
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();
            } catch (Exception e) {
                throw new CustomAuthenticationException("Failed to authenticate user", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            if (request.getGoogleIDToken() != null) {
                GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(TRANSPORT, JSON_FACTORY)
                        .setAudience(Collections.singletonList(CLIENT_ID))
                        .build();
                GoogleIdToken idToken = verifier.verify(request.getGoogleIDToken());
                if (idToken != null) {
                    GoogleIdToken.Payload payload = idToken.getPayload();
                    String email = payload.getEmail();

                    AppUser existingUser = appUserRepository.findByEmail(email)
                            .orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

                    String jwt = jwtService.generateJwt(existingUser);
                    revokeAllUserTokens(existingUser);
                    saveUserToken(existingUser, jwt);

                    return AuthenticationResponse.builder().token(jwt).build();
                } else {
                    throw new CustomAuthenticationException("Invalid GoogleID Token", HttpStatus.BAD_REQUEST);
                }
            } else {
                try {
                    // The existing username-password authentication
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmail(),
                                    request.getPassword()));
                } catch (BadCredentialsException e) {
                    throw new CustomAuthenticationException("Bad credentials", HttpStatus.UNAUTHORIZED);
                }
                AppUser user = appUserRepository.findByEmail(request.getEmail())
                        .orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));
                String jwt = jwtService.generateJwt(user);
                revokeAllUserTokens(user);
                saveUserToken(user, jwt);
                return AuthenticationResponse.builder().token(jwt).build();
            }
        } catch (CustomAuthenticationException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomAuthenticationException("Authentication failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void saveUserToken(AppUser appUser, String jwtToken) {
        var token = Token.builder()
                .appUser(appUser)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(AppUser user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private boolean verifyGoogleIDToken(String idToken) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(TRANSPORT, JSON_FACTORY)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();
            GoogleIdToken googleIdToken = verifier.verify(idToken);
            if (idToken != null) {
                return true;
            }
        } catch (Exception e) {
            // Loggen oder weiterreichen
        }
        return false;
    }

}
