package com.nutrifom.nutrifomapi.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.gson.Gson;
import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.config.JwtService;
import com.nutrifom.nutrifomapi.token.Token;
import com.nutrifom.nutrifomapi.token.TokenRepository;
import com.nutrifom.nutrifomapi.token.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository appUserRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new GsonFactory();
    private static final String CLIENT_ID = "286231394640-t7gi95sph1bu8v19sq8khp83c0bi3h61.apps.googleusercontent.com";

    public AuthenticationResponse register(RegisterRequest request) {

        if (request.getGoogleIDToken() != null) {
            if (!verifyGoogleIDToken(request.getGoogleIDToken())) {
                // Token ist ungültig
                return null;  // Oder werfe eine Ausnahme
            }
        }

        if(request.getPassword() == null) {
            var user = AppUser.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password((request.getPassword()))
                    .dob(request.getDob())
                    .weight(request.getWeight())
                    .goal(request.getGoal())
                    .gender(request.getGender())
                    .height(request.getHeight())
                    .pal(request.getPal())
                    .image(request.getImage())
                    .build();
            var savedUser = appUserRepository.save(user);
            var jwtToken = jwtService.generateJwt(user);
            saveUserToken(savedUser, jwtToken);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } else {
            var user = AppUser.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .dob(request.getDob())
                    .weight(request.getWeight())
                    .goal(request.getGoal())
                    .gender(request.getGender())
                    .height(request.getHeight())
                    .pal(request.getPal())
                    .image(request.getImage())
                    .build();
            var savedUser = appUserRepository.save(user);
            var jwtToken = jwtService.generateJwt(user);
            saveUserToken(savedUser, jwtToken);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        if (request.getGoogleIDToken() != null) {
            try {
                GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(TRANSPORT, JSON_FACTORY)
                        .setAudience(Collections.singletonList(CLIENT_ID))
                        .build();
                GoogleIdToken idToken = verifier.verify(request.getGoogleIDToken());
                if (idToken != null) {
                    GoogleIdToken.Payload payload = idToken.getPayload();
                    String email = payload.getEmail();

                    AppUser existingUser = appUserRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found"));

                    String jwt = jwtService.generateJwt(existingUser);
                    revokeAllUserTokens(existingUser);
                    saveUserToken(existingUser, jwt);

                    return AuthenticationResponse.builder().token(jwt).build();
                }
            } catch (Exception e) {
                // Log error and throw an exception
            }
        } else {
            // The existing username-password authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            AppUser user = appUserRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            String jwt = jwtService.generateJwt(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwt);
            return AuthenticationResponse.builder().token(jwt).build();
        }
        return null; // or throw an exception
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
