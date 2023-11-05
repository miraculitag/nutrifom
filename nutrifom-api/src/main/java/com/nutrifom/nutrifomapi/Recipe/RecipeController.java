package com.nutrifom.nutrifomapi.Recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping("/get/by-tag")
    public List<Recipe> getRecipesByTag(@RequestParam String tag) {
        return recipeService.getRecipesByTag(tag);
    }

}
