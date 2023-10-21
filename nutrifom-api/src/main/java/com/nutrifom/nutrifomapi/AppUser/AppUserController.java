package com.nutrifom.nutrifomapi.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/appUser")
public class AppUserController {
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/get/{appUserEmail}")
    public Optional<AppUser> getUserByEmail(@PathVariable("appUserEmail") String appUserEmail) {
        return appUserService.getAppUserByEmail(appUserEmail);
    }

    @GetMapping("/get/image/{email}")
    public ResponseEntity<byte[]> getAppUserImage(@PathVariable String email) {
        try {
            byte[] imageData = appUserService.getAppUserImage(email);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);  // Oder den tatsächlichen Medientyp des Bildes

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/put/goal/{goal}")
    public ResponseEntity<String> updateGoal(@PathVariable String goal, @RequestParam String email) {
        return appUserService.updateAppUserGoal(email, goal);
    }

    @PutMapping("/put/weight/{weight}")
    public ResponseEntity<String> updateWeight(@PathVariable int weight, @RequestParam String email) {
        return appUserService.updateAppUserWeight(email, weight);
    }

    @PutMapping("/put/pal/{pal}")
    public ResponseEntity<String> updatePal(@PathVariable String pal, @RequestParam String email) {
        return appUserService.updateAppUserPal(email, pal);
    }

    @PutMapping("/put/image")
    public ResponseEntity<?> updateAppUserImage(@RequestParam String email, @RequestParam("file") MultipartFile file) {
        try {
            HttpStatus status = appUserService.updateAppUserImage(email, file);
            return new ResponseEntity<>(status);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping(path = "/del/{appUserEmail}")
    public ResponseEntity<String> deleteAppUser(@PathVariable("appUserEmail") String email) {
        try {
            appUserService.deleteAppUserByEmail(email);
            return new ResponseEntity<>("User with email " + email + " deleted successfully.", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
