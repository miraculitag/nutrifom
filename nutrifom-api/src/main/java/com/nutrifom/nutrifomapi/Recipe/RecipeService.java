package com.nutrifom.nutrifomapi.Recipe;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.Rating.Rating;
import com.nutrifom.nutrifomapi.Rating.RatingRepository;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RatingRepository ratingRepository;

    public List<Recipe> getAllRecipes() throws CustomAuthenticationException {
        try {
            Sort sort = Sort.by(Sort.Direction.DESC, "averageRating")
                    .and(Sort.by(Sort.Direction.DESC, "uses"));

            return recipeRepository.findAll(sort);
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error while getting all recipes", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public HttpStatus rateRecipe(Integer recipeId, Integer userId, Double score) throws CustomAuthenticationException {
        try {
            Recipe recipe = recipeRepository.findById(recipeId)
                    .orElseThrow(() -> new CustomAuthenticationException("Recipe not found", HttpStatus.NOT_FOUND));
            AppUser user = appUserRepository.findById(userId)
                    .orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

            Optional<Rating> existingRatingOptional = ratingRepository.findByAppUserIdAndRecipeId(userId, recipeId);



            if (existingRatingOptional.isPresent()) {
                // User has already rated this recipe, update the existing rating
                Rating existingRating = existingRatingOptional.get();
                existingRating.setScore(score);
                ratingRepository.save(existingRating);
            } else {
                // This is the user's first rating for this recipe, create a new rating
                Rating newRating = new Rating();
                newRating.setAppUser(user);
                newRating.setScore(score);
                newRating.setRecipe(recipe);
                ratingRepository.save(newRating);
            }

            // Recalculate the average rating for the recipe
            double averageRating = ratingRepository.findByRecipeId(recipe.getId()).stream()
                    .mapToDouble(Rating::getScore)
                    .average()
                    .orElse(0.0);
            recipe.setAverageRating(averageRating);
            recipeRepository.save(recipe);
            return HttpStatus.OK;
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

    public HttpStatus updateRecipeImage(int id, MultipartFile file) throws CustomAuthenticationException {
        Recipe existingRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new CustomAuthenticationException("Recipe with id " + id + " doesn't exist", HttpStatus.NOT_FOUND));

        try {
            byte[] bytes = file.getBytes();
            existingRecipe.setImage(bytes);
            recipeRepository.save(existingRecipe);
            return HttpStatus.OK;
        } catch (IOException e) {
            // Fehlerbehandlung
            throw new CustomAuthenticationException("Error while updating image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
