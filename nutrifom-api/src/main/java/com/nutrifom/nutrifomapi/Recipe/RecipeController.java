package com.nutrifom.nutrifomapi.Recipe;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.config.JwtService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
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
    private JwtService jwtService;

    @GetMapping("tag/{tag}")
    public List<Recipe> getRecipesByTag(@PathVariable String tag) {
        return recipeService.getRecipesByTag(tag);
    }

    @PostMapping("{recipeId}/rate")
    public Recipe rateRecipe(@PathVariable Integer recipeId,
                             Principal principal,
                             @RequestBody Double score) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        return recipeService.rateRecipe(recipeId, userId, score);
    }

    @GetMapping("{recipeId}")
    public Recipe getRecipeById(@PathVariable Integer recipeId) {
        return recipeRepository.findById(recipeId).orElseThrow();
    }



}
