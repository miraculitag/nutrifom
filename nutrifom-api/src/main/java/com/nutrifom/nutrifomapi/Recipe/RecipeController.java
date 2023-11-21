package com.nutrifom.nutrifomapi.Recipe;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/recipe")
@SecurityRequirement(name = "bearerAuth")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

     @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("tag/{tag}")
    public List<Recipe> getRecipesByTag(@PathVariable String tag) {
        return recipeService.getRecipesByTag(tag);
    }

    @PostMapping("{recipeId}/rate")
    public Recipe rateRecipe(@PathVariable Integer recipeId,
                             @RequestParam Integer userId,
                             @RequestBody Double score) {
        return recipeService.rateRecipe(recipeId, userId, score);
    }

    @GetMapping("{recipeId}")
    public Recipe getRecipeById(@PathVariable Integer recipeId) {
        return recipeRepository.findById(recipeId).orElseThrow();
    }



}
