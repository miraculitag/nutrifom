package com.nutrifom.nutrifomapi.Weight;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("api/weight")
@SecurityRequirement(name = "bearerAuth")
public class WeightController {

    @Autowired
    private WeightService weightService;

    @Autowired
    private AppUserRepository appUserRepository;

    @GetMapping("{userId}/history")
    public ResponseEntity<List<WeightEntry>> getWeightHistory(@PathVariable Integer userId) {
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        if (appUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<WeightEntry> weightHistory = weightService.getWeightHistory(appUser);
        return new ResponseEntity<>(weightHistory, HttpStatus.OK);
    }

    @PostMapping("{userId}/entry")
    public ResponseEntity<String> addWeightEntry(
            @PathVariable Integer userId,
            @RequestParam Integer weight,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        if (appUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        weightService.addWeightEntry(appUser, weight, entryDate);
        return new ResponseEntity<>("Weight entry added successfully", HttpStatus.OK);
    }

    @GetMapping("{userId}/last14Days")
    public ResponseEntity<List<Double>> getLast14DaysWeightHistory(@PathVariable Integer userId) {
        if (!appUserRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Double> weightHistoryForLast14Days = weightService.getWeightHistoryForLast14Days(userId);
        return new ResponseEntity<>(weightHistoryForLast14Days, HttpStatus.OK);
    }
}
