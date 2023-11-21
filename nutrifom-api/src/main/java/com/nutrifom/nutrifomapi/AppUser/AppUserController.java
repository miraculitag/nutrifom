package com.nutrifom.nutrifomapi.AppUser;

import java.util.Optional;

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

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Integer userId) {
        Optional<AppUser> user = appUserService.getAppUserById(userId);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{userId}/image")
    public ResponseEntity<byte[]> getAppUserImage(@PathVariable Integer userId) {
        try {
            byte[] imageData = appUserService.getAppUserImage(userId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Oder den tatsächlichen Medientyp des Bildes

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}/goal")
    public ResponseEntity<String> updateGoal(@PathVariable Integer userId, @RequestParam String goal) {
        return appUserService.updateAppUserGoal(userId, goal);
    }

    @PutMapping("/{userId}/weight")
    public ResponseEntity<String> updateWeight(@PathVariable Integer userId, @RequestParam int weight) {
        return appUserService.updateAppUserWeight(userId, weight);
    }

    @PutMapping("/{userId}/pal")
    public ResponseEntity<String> updatePal(@PathVariable Integer userId, @RequestParam String pal) {
        return appUserService.updateAppUserPal(userId, pal);
    }

    @PutMapping("/{userId}/wpa")
    public ResponseEntity<String> updateWpa(@PathVariable Integer userId, @RequestParam double wpa) {
        return appUserService.updateAppUserWpa(userId, wpa);
    }

    @PutMapping("/{userId}/image")
    public ResponseEntity<?> updateAppUserImage(@PathVariable Integer userId, @RequestParam MultipartFile image) {
        try {
            HttpStatus status = appUserService.updateAppUserImage(userId, image);
            return new ResponseEntity<>(status);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteAppUser(@PathVariable Integer userId) {
        try {
            appUserService.deleteAppUser(userId);
            return new ResponseEntity<>("User with id " + userId + " deleted successfully.", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
