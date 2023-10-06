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

    @GetMapping("/get/all")
    public List<AppUser> getUsers() {
        return appUserService.getAppUsers();
    }

    @GetMapping("/get/{appUserID}")
    public Optional<AppUser> getUserByID(@PathVariable("appUserID") Integer appUserID) {
        return appUserService.getAppUserByID(appUserID);
    }

    @PostMapping("/post")
    public AppUser addUser(@RequestBody AppUser appUser) {
        return appUserService.addAppUser(appUser);
    }

    @PutMapping(path = "/put/{appUserID}")
    public ResponseEntity<AppUser> updateAppUser(@PathVariable("appUserID") Integer appUserID, @RequestBody AppUser updatedAppUser) {
        try {
            AppUser appUser = appUserService.updateAppUser(appUserID, updatedAppUser);
            return new ResponseEntity<>(appUser, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/del/{appUserID}")
    public ResponseEntity<String> deleteAppUser(@PathVariable("appUserID") Integer appUserID) {
        try {
            appUserService.deleteAppUser(appUserID);
            return new ResponseEntity<>("User with ID " + appUserID + " deleted successfully.", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
