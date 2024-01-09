package com.nutrifom.nutrifomapi.AppUser;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.nutrifom.nutrifomapi.Nutrilog.Nutrilog;
import com.nutrifom.nutrifomapi.Nutrilog.NutrilogRepository;
import com.nutrifom.nutrifomapi.Rating.Rating;
import com.nutrifom.nutrifomapi.Rating.RatingRepository;
import com.nutrifom.nutrifomapi.Recipe.Recipe;
import com.nutrifom.nutrifomapi.Recipe.RecipeRepository;
import com.nutrifom.nutrifomapi.Weight.WeightEntryRepository;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import com.nutrifom.nutrifomapi.token.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    private final WeightEntryRepository weightEntryRepository;

    private final TokenRepository tokenRepository;
    private final NutrilogRepository nutrilogRepository;
    private final RatingRepository ratingRepository;
    private final RecipeRepository recipeRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, WeightEntryRepository weightEntryRepository, TokenRepository tokenRepository, NutrilogRepository nutrilogRepository, RatingRepository ratingRepository, RecipeRepository recipeRepository) {
        this.appUserRepository = appUserRepository;
        this.weightEntryRepository = weightEntryRepository;
        this.tokenRepository = tokenRepository;
        this.nutrilogRepository = nutrilogRepository;
        this.ratingRepository = ratingRepository;
        this.recipeRepository = recipeRepository;
    }

    public ResponseEntity<String> getAppUserKcalGoal(int id) throws CustomAuthenticationException {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND));

        return new ResponseEntity<>("KcalGoal for userid " + id + ": " + existingAppUser.getKcalGoal(), HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserKcalGoal(int id, int updatedKcalGoal) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setKcalGoal(updatedKcalGoal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated KcalGoal: " + updatedKcalGoal + " for userid: " + id, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserGoal(int id, String updatedGoal) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setGoal(updatedGoal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated goal: " + updatedGoal + " for userid: " + id, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserPal(int id, String updatedPal) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setPal(updatedPal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated PAL: " + updatedPal + " for userid: " + id, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserWpa(int id, double updatedWpa) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setWpa(updatedWpa);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated WPA: " + updatedWpa + " for userid:" + id, HttpStatus.OK);
    }

    public HttpStatus updateAppUserImage(int id, MultipartFile file) throws CustomAuthenticationException {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomAuthenticationException("User with userid " + id + " doesn't exist", HttpStatus.NOT_FOUND));

        try {
            byte[] bytes = file.getBytes();
            existingAppUser.setImage(bytes);
            appUserRepository.save(existingAppUser);
            return HttpStatus.OK;
        } catch (IOException e) {
            // Fehlerbehandlung
            throw new CustomAuthenticationException("Error while updating image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    public byte[] getAppUserImage(int id) throws CustomAuthenticationException {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND));

        byte[] imageData = existingAppUser.getImage();

        if (imageData == null) {
            throw new CustomAuthenticationException("No image found for user with userid " + id, HttpStatus.NOT_FOUND);
        }

        return imageData;
    }


    @Transactional
    public void deleteAppUser(int id) throws CustomAuthenticationException {
        Optional<AppUser> foundUser = appUserRepository.findById(id);

        if (!foundUser.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        try {
            List<Rating> ratings = ratingRepository.findByAppUserId(id);

            for (Rating rating : ratings) {
                Recipe recipe = rating.getRecipe();
                ratingRepository.delete(rating);
                double averageRating = ratingRepository.findByRecipeId(recipe.getId()).stream()
                        .mapToDouble(Rating::getScore)
                        .average()
                        .orElse(0.0);
                // Round the average rating to one decimal place
                averageRating = Math.round(averageRating * 10.0) / 10.0;
                // Set the new average rating
                recipe.setAverageRating(averageRating);
                // Update the rating count
                Integer ratingCount = ratingRepository.countByRecipeId(recipe.getId());
                recipe.setRatingCount(ratingCount);
                // Save the updated recipe
                recipeRepository.save(recipe);
            }
        } catch (Exception e) {
            System.out.println("Fehler beim Löschen von Ratings: " + e.getMessage());
            throw e;
        }
        try {
            weightEntryRepository.deleteByAppUserId(id);
        } catch (Exception e) {
            System.out.println("Fehler beim Löschen von WeightEntries: " + e.getMessage());
            throw e;
        }
        try {
            tokenRepository.deleteByAppUserId(id);
        } catch (Exception e) {
            System.out.println("Fehler beim Löschen von Tokens: " + e.getMessage());
            throw e;
        }

        try {
            List<Recipe> recipes = recipeRepository.findAll();
            for (Recipe recipe : recipes) {
                List<Nutrilog> nutrilogs = nutrilogRepository.findByAppUserIdAndRecipe_Id(id, recipe.getId());
                int count = nutrilogs.size();
                recipe.setUses(recipe.getUses() - count);
                recipeRepository.save(recipe);
            }
        } catch (Exception e) {
            System.out.println("Fehler beim Aktualisieren der Uses: " + e.getMessage());
            throw e;
        }
        try {
            nutrilogRepository.deleteByAppUserId(id);
        } catch (Exception e) {
            System.out.println("Fehler beim Löschen von Nutrilogs: " + e.getMessage());
            throw e;
        }

        try {
            appUserRepository.deleteById(foundUser.get().getId());
        } catch (Exception e) {
            System.out.println("Fehler beim Löschen des Benutzers: " + e.getMessage());
            throw e;
        }
    }


}
