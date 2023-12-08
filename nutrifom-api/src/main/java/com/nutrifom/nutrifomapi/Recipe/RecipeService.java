package com.nutrifom.nutrifomapi.Recipe;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public List<Recipe> getAllRecipes() throws CustomAuthenticationException {
        try {
            Sort sort = Sort.by(Sort.Direction.DESC, "averageRating")
                    .and(Sort.by(Sort.Direction.DESC, "uses"));

            return recipeRepository.findAll(sort);
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error while getting all recipes", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Recipe rateRecipe(Integer recipeId, Integer userId, Double score) throws CustomAuthenticationException {
        try {
            Recipe recipe = recipeRepository.findById(recipeId)
                    .orElseThrow(() -> new CustomAuthenticationException("Recipe not found", HttpStatus.NOT_FOUND));
            AppUser user = appUserRepository.findById(userId)
                    .orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

            Optional<Rating> existingRating = recipe.getRatings().stream()
                    .filter(r -> r.getAppUser().getId() == userId)
                    .findFirst();

            if (existingRating.isPresent()) {
                existingRating.get().setScore(score);
            } else {
                Rating newRating = new Rating();
                newRating.setAppUser(user);
                newRating.setScore(score);
                newRating.setRecipe(recipe);
                recipe.getRatings().add(newRating);
            }

            double averageRating = recipe.getRatings().stream()
                    .mapToDouble(Rating::getScore)
                    .average()
                    .orElse(0.0);

            recipe.setAverageRating(averageRating);

            return recipeRepository.save(recipe);
        } catch (CustomAuthenticationException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error while rating recipe", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Recipe incrementRecipeUses(Integer recipeId) throws CustomAuthenticationException {
        try {
            Recipe recipe = recipeRepository.findById(recipeId)
                    .orElseThrow(() -> new CustomAuthenticationException("Recipe not found", HttpStatus.NOT_FOUND));

            recipe.setUses(recipe.getUses() + 1);

            return recipeRepository.save(recipe);
        } catch (CustomAuthenticationException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error while incrementing recipe uses", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
