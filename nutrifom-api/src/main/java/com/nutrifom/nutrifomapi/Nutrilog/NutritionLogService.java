package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.List;

import com.nutrifom.nutrifomapi.Recipe.Recipe;
import com.nutrifom.nutrifomapi.Recipe.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;

@Service
public class NutritionLogService {
    @Autowired
    private NutritionLogRepository nutritionLogRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public NutritionLog saveProductLog(Integer userId, Product product, LocalDate entryDate) {
        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        NutritionLog nutritionLog = new NutritionLog();
        nutritionLog.setAppUser(appUser);
        nutritionLog.setCode(product.getCode());
        nutritionLog.setProductName(product.getProductName());
        nutritionLog.setProduct_quantity(product.getProduct_quantity());
        nutritionLog.setServing_quantity(product.getServing_quantity());
        nutritionLog.setProteins_serving(product.getProteins_serving());
        nutritionLog.setCarbohydrates_serving(product.getCarbohydrates_serving());
        nutritionLog.setEnergy_kcal_serving(product.getEnergy_kcal_serving());
        nutritionLog.setFat_serving(product.getFat_serving());
        nutritionLog.setSaturated_fat_serving(product.getSaturated_fat_serving());
        nutritionLog.setEntryDate(entryDate);

        return nutritionLogRepository.save(nutritionLog);
    }

    public NutritionLog saveRecipeLog(Integer userId, Integer recipeId, LocalDate entryDate) {
        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalStateException("Recipe not found"));

        NutritionLog nutritionLog = new NutritionLog();
        nutritionLog.setAppUser(appUser);
        nutritionLog.setRecipe(recipe);
        nutritionLog.setEntryDate(entryDate);

        return nutritionLogRepository.save(nutritionLog);
    }



    public List<NutritionLog> getNutritionLogs(Integer appUserId, LocalDate entryDate) {
        return nutritionLogRepository.findByAppUserIdAndEntryDate(appUserId, entryDate);
    }
}
