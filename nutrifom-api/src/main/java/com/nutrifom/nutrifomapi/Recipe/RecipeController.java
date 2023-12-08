package com.nutrifom.nutrifomapi.Recipe;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.config.JwtService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/recipe")
@SecurityRequirement(name = "bearerAuth")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

     @Autowired
    private RecipeRepository recipeRepository;

     @Autowired
     private AppUserRepository appUserRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/all")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }


    @PostMapping("/rate")
    public ResponseEntity<?> rateRecipe(Principal principal, @RequestBody RecipeRatingDTO ratingDTO) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> userOptional = jwtService.getAppUserFromToken(username);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: User not found.");
        }

        int userId = userOptional.get().getId();
        Optional<AppUser> appUserOptional = appUserRepository.findById(userId);

        if (!appUserOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        try {
            Recipe ratedRecipe = recipeService.rateRecipe(ratingDTO.getRecipeId(), userId, ratingDTO.getScore());
            return ResponseEntity.ok(ratedRecipe);
        } catch (Exception e) {
            // Loggen Sie hier den Fehler
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while rating the recipe.");
        }
    }



    @GetMapping("{recipeId}")
    public Recipe getRecipeById(@PathVariable Integer recipeId) {
        return recipeRepository.findById(recipeId).orElseThrow();
    }



}
