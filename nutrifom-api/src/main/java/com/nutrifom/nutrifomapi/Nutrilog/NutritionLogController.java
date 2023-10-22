package com.nutrifom.nutrifomapi.Nutrilog;

import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/nutrilog")
@SecurityRequirement(name = "bearerAuth")
public class NutritionLogController {
    @Autowired
    private NutritionLogService nutritionLogService;

    @PostMapping("/save")
    public ResponseEntity<String> saveNutritionLog(
            @RequestParam Integer userId,
            @RequestBody Product product,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        try {
            nutritionLogService.saveNutritionLog(userId, product, entryDate);
            return new ResponseEntity<>("Nutrition log entry added successfully", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<NutritionLog>> getNutritionLogs(
            @RequestParam Integer appUserId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        return ResponseEntity.ok(nutritionLogService.getNutritionLogs(appUserId, entryDate));
    }
}

