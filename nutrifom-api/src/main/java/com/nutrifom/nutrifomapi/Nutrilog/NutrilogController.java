package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.List;

import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/nutrilog")
@SecurityRequirement(name = "bearerAuth")
public class NutrilogController {
    @Autowired
    private NutrilogService nutrilogService;

    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/{userId}/product")
    public ResponseEntity<String> saveProductLog(
            @PathVariable Integer userId,
            @RequestBody Product product,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        try {
            nutrilogService.saveProductLog(userId, product, entryDate);
            return new ResponseEntity<>("Product log entry added successfully", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{userId}/recipe")
    public ResponseEntity<String> saveRecipeLog(
            @PathVariable Integer userId,
            @RequestParam Integer recipeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        try {
            nutrilogService.saveRecipeLog(userId, recipeId, entryDate);
            return new ResponseEntity<>("Recipe log entry added successfully", HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Nutrilog>> getNutritionLogs(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        return ResponseEntity.ok(nutrilogService.getNutritionLogs(userId, entryDate));
    }

    @GetMapping("/{userId}/last14DaysCalories")
    public ResponseEntity<List<Double>> getLast14DaysCaloriesHistory(@RequestParam Integer userId) {
        if (!appUserRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Double> caloriesHistoryForLast14Days = nutrilogService.getCaloriesHistoryForLast14Days(userId);
        return new ResponseEntity<>(caloriesHistoryForLast14Days, HttpStatus.OK);
    }
}
