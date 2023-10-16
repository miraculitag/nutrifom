package com.nutrifom.nutrifomapi.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/put/imageBlobUrl/{imageBlobUrl}")
    public ResponseEntity<String> updateImageBlobUrl(@PathVariable String imageBlobUrl, @RequestParam String email) {
        return appUserService.updateAppUserImageBlobUrl(email, imageBlobUrl);
    }


    @DeleteMapping(path = "/del/{appUserEmail}")
    public ResponseEntity<String> deleteAppUser(@PathVariable("appUserEmail") String email) {
        try {
            appUserService.deleteAppUserByEmail(email);
            return new ResponseEntity<>("User with email" + email + " deleted successfully.", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
