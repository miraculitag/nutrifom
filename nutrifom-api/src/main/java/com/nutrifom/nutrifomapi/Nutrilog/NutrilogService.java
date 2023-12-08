package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.nutrifom.nutrifomapi.Recipe.Recipe;
import com.nutrifom.nutrifomapi.Recipe.RecipeRepository;
import com.nutrifom.nutrifomapi.Recipe.RecipeService;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;

@Service
public class NutrilogService {
    @Autowired
    private NutrilogRepository nutrilogRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RecipeService recipeService;

    public Nutrilog saveProductLog(Integer userId, Product product, LocalDate entryDate) throws CustomAuthenticationException{
        Optional<AppUser> appUserOptional = appUserRepository.findById(userId);
        if (!appUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + userId + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser appUser = appUserOptional.get();

        Nutrilog nutrilog = new Nutrilog();
        nutrilog.setAppUser(appUser);
        nutrilog.setCode(product.getCode());
        nutrilog.setProductName(product.getProductName());
        nutrilog.setProduct_quantity(product.getProduct_quantity());
        nutrilog.setServing_quantity(product.getServing_quantity());
        nutrilog.setProteins_serving(product.getProteins_serving());
        nutrilog.setCarbohydrates_serving(product.getCarbohydrates_serving());
        nutrilog.setEnergy_kcal_serving(product.getEnergy_kcal_serving());
        nutrilog.setSaturated_fat_serving(product.getSaturated_fat_serving());
        nutrilog.setUnsaturated_fat_serving(product.getUnsaturated_fat_serving());
        nutrilog.setEntryDate(entryDate);

        return nutrilogRepository.save(nutrilog);
    }

    public Nutrilog saveRecipeLog(Integer userId, Integer recipeId, LocalDate entryDate) {
        Optional<AppUser> appUserOptional = appUserRepository.findById(userId);
        if (!appUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + userId + " doesn't exist", HttpStatus.NOT_FOUND);
        }
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalStateException("Recipe not found"));

        AppUser appUser = appUserOptional.get();
        Nutrilog nutrilog = new Nutrilog();
        nutrilog.setAppUser(appUser);
        nutrilog.setRecipe(recipe);
        nutrilog.setEntryDate(entryDate);
        recipeService.incrementRecipeUses(recipeId);

        return nutrilogRepository.save(nutrilog);
    }



    public List<Nutrilog> getNutritionLogs(Integer appUserId, LocalDate entryDate) throws CustomAuthenticationException {
        Optional<AppUser> appUser = appUserRepository.findById(appUserId);
        if (!appUser.isPresent()) {
            throw new CustomAuthenticationException("User with id " + appUserId + " doesn't exist", HttpStatus.NOT_FOUND);
        }
        return nutrilogRepository.findByAppUserIdAndEntryDate(appUserId, entryDate);
    }

    public List<Double> getCaloriesHistoryForLast14Days(Integer appUserId) throws CustomAuthenticationException {
        Optional<AppUser> appUser = appUserRepository.findById(appUserId);
        if (!appUser.isPresent()) {
            throw new CustomAuthenticationException("User with id " + appUserId + " doesn't exist", HttpStatus.NOT_FOUND);
        }
        LocalDate startDate = LocalDate.now().minusDays(13);
        List<Double> caloriesHistory = new ArrayList<>();

        for (int i = 0; i < 14; i++) {
            LocalDate dateToCheck = startDate.plusDays(i);
            List<Nutrilog> logsForDay = nutrilogRepository.findByAppUserIdAndEntryDate(appUserId, dateToCheck);

            double dailyCalories = logsForDay.stream()
                    .mapToDouble(log -> log.getEnergy_kcal_serving() * log.getServing_quantity())
                    .sum();

            caloriesHistory.add(dailyCalories);
        }

        Collections.reverse(caloriesHistory);
        return caloriesHistory;
    }
}
