package com.nutrifom.nutrifomapi.AppUser;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/get/user")
    public Optional<AppUser> getUserByEmail(@RequestParam String email) {
        return appUserService.getAppUserByEmail(email);
    }

    @GetMapping("/get/image")
    public ResponseEntity<byte[]> getAppUserImage(@RequestParam String email) {
        try {
            byte[] imageData = appUserService.getAppUserImage(email);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Oder den tatsächlichen Medientyp des Bildes

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/put/goal")
    public ResponseEntity<String> updateGoal(@RequestParam String goal, @RequestParam String email) {
        return appUserService.updateAppUserGoal(email, goal);
    }

    @PutMapping("/put/weight")
    public ResponseEntity<String> updateWeight(@RequestParam int weight, @RequestParam String email) {
        return appUserService.updateAppUserWeight(email, weight);
    }

    @PutMapping("/put/pal")
    public ResponseEntity<String> updatePal(@RequestParam String pal, @RequestParam String email) {
        return appUserService.updateAppUserPal(email, pal);
    }

    @PutMapping("/put/wpa")
    public ResponseEntity<String> updateWpa(@RequestParam double wpa, @RequestParam String email) {
        return appUserService.updateAppUserWpa(email, wpa);
    }

    @PutMapping("/put/image")
    public ResponseEntity<?> updateAppUserImage(@RequestParam String email, @RequestParam MultipartFile image) {
        try {
            HttpStatus status = appUserService.updateAppUserImage(email, image);
            return new ResponseEntity<>(status);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/del")
    public ResponseEntity<String> deleteAppUser(@RequestParam String email) {
        try {
            appUserService.deleteAppUserByEmail(email);
            return new ResponseEntity<>("User with email " + email + " deleted successfully.", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
