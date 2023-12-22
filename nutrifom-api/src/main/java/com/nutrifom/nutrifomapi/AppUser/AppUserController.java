package com.nutrifom.nutrifomapi.AppUser;

import java.security.Principal;
import java.util.Optional;

import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import com.nutrifom.nutrifomapi.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("api/appUser")
@SecurityRequirement(name = "bearerAuth")
public class AppUserController {
    private final AppUserService appUserService;

    private final JwtService jwtService;

    @Autowired
    public AppUserController(AppUserService appUserService, JwtService jwtService) {
        this.appUserService = appUserService;
        this.jwtService = jwtService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(Principal principal) {
        try {
            String username = principal.getName(); // Hier ist die E-Mail-Adresse
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (CustomAuthenticationException e) {
            // Spezifische Ausnahme, die im Service geworfen wird
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            // Generelle Ausnahme
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> getAppUserImage(Principal principal) {
        try {
            String username = principal.getName(); // Hier ist die E-Mail-Adresse
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            byte[] imageData = appUserService.getAppUserImage(userId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Oder den tatsächlichen Medientyp des Bildes

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(new byte[0]);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new byte[0]);
        }
    }

    @GetMapping("/kcalgoal")
    public ResponseEntity<?> getKcalGoal(Principal principal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            return appUserService.getAppUserKcalGoal(userId);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PutMapping("/kcalgoal")
    public ResponseEntity<?> updateKcalGoal(Principal principal, @RequestParam int updatedKcalGoal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            return appUserService.updateAppUserKcalGoal(userId, updatedKcalGoal);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PutMapping("/goal")
    public ResponseEntity<String> updateGoal(Principal principal, @RequestParam String goal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            return appUserService.updateAppUserGoal(userId, goal);
        } catch (CustomAuthenticationException e) {
            // Spezifische Ausnahme, die im Service geworfen wird
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            // Generelle Ausnahme
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PutMapping("/pal")
    public ResponseEntity<String> updatePal(Principal principal, @RequestParam String pal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            return appUserService.updateAppUserPal(userId, pal);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PutMapping("/wpa")
    public ResponseEntity<String> updateWpa(Principal principal, @RequestParam double wpa) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            return appUserService.updateAppUserWpa(userId, wpa);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PutMapping("/image")
    public ResponseEntity<?> updateAppUserImage(Principal principal, @RequestParam MultipartFile image) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            HttpStatus status = appUserService.updateAppUserImage(userId, image);
            return new ResponseEntity<>(status);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @DeleteMapping("/user")
    public ResponseEntity<String> deleteAppUser(Principal principal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            appUserService.deleteAppUser(userId);
            return new ResponseEntity<>("User with id " + userId + " deleted successfully.", HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}
