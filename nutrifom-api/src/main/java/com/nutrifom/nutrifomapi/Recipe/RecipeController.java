package com.nutrifom.nutrifomapi.Recipe;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@SecurityRequirement(name = "bearerAuth")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

     @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/get/by-tag")
    public List<Recipe> getRecipesByTag(@RequestParam String tag) {
        return recipeService.getRecipesByTag(tag);
    }

    @PostMapping("/rate/{recipeId}")
    public Recipe rateRecipe(@PathVariable Integer recipeId,
                             @RequestParam Integer userId,
                             @RequestBody Double score) {
        return recipeService.rateRecipe(recipeId, userId, score);
    }

    @GetMapping("/get/by-id")
    public Recipe getRecipeById(@RequestParam Integer recipeId) {
        return recipeRepository.findById(recipeId).orElseThrow();
    }



}
