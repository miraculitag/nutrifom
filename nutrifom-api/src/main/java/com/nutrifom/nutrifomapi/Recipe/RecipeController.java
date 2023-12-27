package com.nutrifom.nutrifomapi.Recipe;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.Rating.RecipeRatingDTO;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import com.nutrifom.nutrifomapi.config.JwtService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.ArrayList;
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
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        try {
            List<Recipe> recipes = recipeService.getAllRecipes();
            return ResponseEntity.ok(recipes);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    @PostMapping("/rate")
    public ResponseEntity<String> rateRecipe(Principal principal, @RequestBody RecipeRatingDTO ratingDTO) {
        try {
            String username = principal.getName();
            Optional<AppUser> userOptional = jwtService.getAppUserFromToken(username);

            if (userOptional.isEmpty()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = userOptional.get().getId();

            recipeService.rateRecipe(ratingDTO.getRecipeId(), userId, ratingDTO.getScore());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("{recipeId}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer recipeId) {
        try {
            Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new CustomAuthenticationException("Recipe not found", HttpStatus.NOT_FOUND));
            return ResponseEntity.ok(recipe);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<?> updateRecipeImage(@PathVariable int id, @RequestParam MultipartFile image) {
        try {
            HttpStatus status = recipeService.updateRecipeImage(id, image);
            return new ResponseEntity<>(status);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }


}
