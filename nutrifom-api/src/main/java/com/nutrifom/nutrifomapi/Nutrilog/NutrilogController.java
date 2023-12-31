package com.nutrifom.nutrifomapi.Nutrilog;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import com.nutrifom.nutrifomapi.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

    @Autowired
    private JwtService jwtService;

    @PostMapping("/product")
    public ResponseEntity<String> saveProductLog(Principal principal, @RequestBody ProductLogDTO productLogDTO) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            nutrilogService.saveProductLog(user.get(), productLogDTO);
            return new ResponseEntity<>("Product log entry added successfully", HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PostMapping("/recipe")
    public ResponseEntity<?> saveRecipeLog(Principal principal, @RequestBody RecipeLogDTO recipeLogDTO) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            nutrilogService.saveRecipeLog(user.get(), recipeLogDTO);
            return new ResponseEntity<>("Recipe log entry added successfully", HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("")
    public ResponseEntity<NutrilogResponse> getNutritionLogs(
            Principal principal,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate entryDate) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            NutrilogResponse nutrilogResponse = nutrilogService.getNutrilogs(userId, entryDate);
            return ResponseEntity.ok(nutrilogResponse);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/last14DaysCalories")
    public ResponseEntity<List<Double>> getLast14DaysCaloriesHistory(Principal principal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            if (!appUserRepository.existsById(userId)) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            List<Double> caloriesHistoryForLast14Days = nutrilogService.getCaloriesHistoryForLast14Days(userId);
            return new ResponseEntity<>(caloriesHistoryForLast14Days, HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }


}
