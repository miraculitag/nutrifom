package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.List;

import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.Recipe.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/nutrilog")
@SecurityRequirement(name = "bearerAuth")
public class NutritionLogController {
    @Autowired
    private NutritionLogService nutritionLogService;

    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/save/product")
    public ResponseEntity<String> saveProductLog(
            @RequestParam Integer userId,
            @RequestBody Product product,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        try {
            nutritionLogService.saveProductLog(userId, product, entryDate);
            return new ResponseEntity<>("Product log entry added successfully", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save/recipe")
    public ResponseEntity<String> saveRecipeLog(
            @RequestParam Integer userId,
            @RequestParam Integer recipeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        try {
            nutritionLogService.saveRecipeLog(userId, recipeId, entryDate);
            return new ResponseEntity<>("Recipe log entry added successfully", HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/get")
    public ResponseEntity<List<NutritionLog>> getNutritionLogs(
            @RequestParam Integer appUserId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        return ResponseEntity.ok(nutritionLogService.getNutritionLogs(appUserId, entryDate));
    }

    @GetMapping("/last14DaysCalories")
    public ResponseEntity<List<Double>> getLast14DaysCaloriesHistory(@RequestParam Integer userId) {
        if (!appUserRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Double> caloriesHistoryForLast14Days = nutritionLogService.getCaloriesHistoryForLast14Days(userId);
        return new ResponseEntity<>(caloriesHistoryForLast14Days, HttpStatus.OK);
    }
}
