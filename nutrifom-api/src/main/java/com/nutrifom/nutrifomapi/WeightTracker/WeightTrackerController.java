package com.nutrifom.nutrifomapi.WeightTracker;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/weightTrack")
@SecurityRequirement(name = "bearerAuth")
public class WeightTrackerController {

    @Autowired
    private WeightTrackerService weightTrackerService;

    @Autowired
    private AppUserRepository appUserRepository;

    @GetMapping("/history")
    public ResponseEntity<List<WeightEntry>> getWeightHistory(@RequestParam Integer userId) {
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        if (appUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<WeightEntry> weightHistory = weightTrackerService.getWeightHistory(appUser);
        return new ResponseEntity<>(weightHistory, HttpStatus.OK);
    }

    @PostMapping("/entry")
    public ResponseEntity<String> addWeightEntry(
            @RequestParam Integer userId,
            @RequestParam Integer weight,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        if (appUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        weightTrackerService.addWeightEntry(appUser, weight, entryDate);
        return new ResponseEntity<>("Weight entry added successfully", HttpStatus.OK);
    }
}
