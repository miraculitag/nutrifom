package com.nutrifom.nutrifomapi.WeightTracker;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

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

    @GetMapping("/last14DaysHistory")
    public ResponseEntity<List<Integer>> getLast14DaysWeightHistory(@RequestParam Integer userId) {
        if (!appUserRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Integer> weightHistoryForLast14Days = weightTrackerService.getWeightHistoryForLast14Days(userId);
        return new ResponseEntity<>(weightHistoryForLast14Days, HttpStatus.OK);
    }
}
