package com.nutrifom.nutrifomapi.AppUser;

import java.security.Principal;
import java.util.Optional;

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
    public ResponseEntity<AppUser> getUser(Principal principal) {
        // Extrahieren Sie die UserID aus dem JWT.
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> getAppUserImage(Principal principal) {
        try {
            String username = principal.getName(); // Hier ist die E-Mail-Adresse
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            int userId = user.get().getId();
            byte[] imageData = appUserService.getAppUserImage(userId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Oder den tatsächlichen Medientyp des Bildes

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/goal")
    public ResponseEntity<String> updateGoal(Principal principal, @RequestParam String goal) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        return appUserService.updateAppUserGoal(userId, goal);
    }

    @PutMapping("/weight")
    public ResponseEntity<String> updateWeight(Principal principal, @RequestParam int weight) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        return appUserService.updateAppUserWeight(userId, weight);
    }

    @PutMapping("/pal")
    public ResponseEntity<String> updatePal(Principal principal, @RequestParam String pal) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        return appUserService.updateAppUserPal(userId, pal);
    }

    @PutMapping("/wpa")
    public ResponseEntity<String> updateWpa(Principal principal, @RequestParam double wpa) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        return appUserService.updateAppUserWpa(userId, wpa);
    }

    @PutMapping("/image")
    public ResponseEntity<?> updateAppUserImage(Principal principal, @RequestParam MultipartFile image) {
        try {
            String username = principal.getName(); // Hier ist die E-Mail-Adresse
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            int userId = user.get().getId();
            HttpStatus status = appUserService.updateAppUserImage(userId, image);
            return new ResponseEntity<>(status);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user")
    public ResponseEntity<String> deleteAppUser(Principal principal) {
        try {
            String username = principal.getName(); // Hier ist die E-Mail-Adresse
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            int userId = user.get().getId();
            appUserService.deleteAppUser(userId);
            return new ResponseEntity<>("User with id " + userId + " deleted successfully.", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
