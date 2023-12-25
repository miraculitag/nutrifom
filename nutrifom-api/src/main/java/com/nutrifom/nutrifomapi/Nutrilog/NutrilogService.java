package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.nutrifom.nutrifomapi.OpenFoodFacts.OFFService;
import com.nutrifom.nutrifomapi.Recipe.Recipe;
import com.nutrifom.nutrifomapi.Recipe.RecipeRepository;
import com.nutrifom.nutrifomapi.Recipe.RecipeService;
import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
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

    @Autowired
    private OFFService offService;

    public Nutrilog saveProductLog(AppUser appuser, ProductLogDTO productLogDTO) throws CustomAuthenticationException {
        Optional<Nutrilog> existingNutrilog = nutrilogRepository.findByAppUserIdAndProductCode(appuser.getId(), productLogDTO.getProductCode());
        if (existingNutrilog.isPresent()) {
            Nutrilog nutrilog = existingNutrilog.get();
            nutrilog.setProductQuantity(nutrilog.getProductQuantity() + productLogDTO.getProductQuantity());
            return nutrilogRepository.save(nutrilog);
        } else {
            Nutrilog nutrilog = new Nutrilog();
            nutrilog.setAppUser(appuser);
            nutrilog.setProductCode(productLogDTO.getProductCode());
            nutrilog.setProductQuantity(productLogDTO.getProductQuantity());
            nutrilog.setEntryDate(productLogDTO.getEntryDate());

            return nutrilogRepository.save(nutrilog);
        }
    }

    public Nutrilog saveRecipeLog(AppUser appuser, RecipeLogDTO recipeLogDTO) throws CustomAuthenticationException {
        Optional<Nutrilog> existingNutrilog = nutrilogRepository.findByAppUserIdAndRecipe_Id(appuser.getId(), recipeLogDTO.getRecipeId());
        if (existingNutrilog.isPresent()) {
            Nutrilog nutrilog = existingNutrilog.get();
            nutrilog.setRecipePortions(nutrilog.getRecipePortions() + recipeLogDTO.getRecipePortions());
            return nutrilogRepository.save(nutrilog);
        } else {
            Nutrilog nutrilog = new Nutrilog();
            Recipe recipe = recipeRepository.findById(recipeLogDTO.getRecipeId()).orElse(null);
            nutrilog.setAppUser(appuser);
            nutrilog.setRecipe(recipe);
            nutrilog.setRecipePortions(recipeLogDTO.getRecipePortions());
            nutrilog.setEntryDate(recipeLogDTO.getEntryDate());
            recipeService.incrementRecipeUses(recipeLogDTO.getRecipeId());

            return nutrilogRepository.save(nutrilog);
        }
    }



    public NutrilogResponse getNutrilogs(Integer userId, LocalDate entryDate) throws CustomAuthenticationException {
        Optional<AppUser> appUser = appUserRepository.findById(userId);
        if (!appUser.isPresent()) {
            throw new CustomAuthenticationException("User with id " + userId + " doesn't exist", HttpStatus.NOT_FOUND);
        }
        List<Nutrilog> nutrilogs = nutrilogRepository.findByAppUserIdAndEntryDate(userId, entryDate);

        List<ProductNutrilog> productNutrilogs = new ArrayList<>();
        List<RecipeNutrilog> recipeNutrilogs = new ArrayList<>();
        NutrilogResponse response = new NutrilogResponse();

        for (Nutrilog nutrilog : nutrilogs) {
            if (nutrilog.getProductCode() != null) {
                // Fetch product details from OFF database
                Product product = offService.getProduct(nutrilog.getProductCode());
                ProductNutrilog productNutrilog = new ProductNutrilog();
                productNutrilog.setProductCode(product.getCode());
                productNutrilog.setProductName(product.getProductName());
                productNutrilog.setProteins(product.getProteins());
                productNutrilog.setCarbohydrates(product.getCarbohydrates());
                productNutrilog.setEnergyKcal(product.getEnergyKcal());
                productNutrilog.setSaturatedFat(product.getSaturatedFat());
                productNutrilog.setUnsaturatedFat(product.getUnsaturatedFat());
                productNutrilog.setProductQuantity(nutrilog.getProductQuantity());
                productNutrilogs.add(productNutrilog);
            } else if (nutrilog.getRecipeId() != null) {
                // Fetch recipe details from Recipe table
                Recipe recipe = recipeRepository.findById(nutrilog.getRecipeId()).orElse(null);
                if (recipe != null) {
                    RecipeNutrilog recipeNutrilog = new RecipeNutrilog();
                    recipeNutrilog.setRecipeId(recipe.getId());
                    recipeNutrilog.setRecipeTitle(recipe.getTitle());
                    recipeNutrilog.setPortions(nutrilog.getRecipePortions());
                    recipeNutrilog.setProteins(recipe.getProteins());
                    recipeNutrilog.setCarbohydrates(recipe.getCarbohydrates());
                    recipeNutrilog.setEnergyKcal(recipe.getEnergyKcal());
                    recipeNutrilog.setSaturatedFat(recipe.getSaturatedFat());
                    recipeNutrilog.setUnsaturatedFat(recipe.getUnsaturatedFat());
                    recipeNutrilogs.add(recipeNutrilog);
                }
            }
        }

        response.setProducts(productNutrilogs);
        response.setRecipes(recipeNutrilogs);
        response.setTotalProteins(productNutrilogs.stream().mapToDouble(ProductNutrilog::getProteins).sum() + recipeNutrilogs.stream().mapToDouble(RecipeNutrilog::getProteins).sum());
        response.setTotalCarbohydrates(productNutrilogs.stream().mapToDouble(ProductNutrilog::getCarbohydrates).sum() + recipeNutrilogs.stream().mapToDouble(RecipeNutrilog::getCarbohydrates).sum());
        response.setTotalEnergyKcal(productNutrilogs.stream().mapToDouble(ProductNutrilog::getEnergyKcal).sum() + recipeNutrilogs.stream().mapToDouble(RecipeNutrilog::getEnergyKcal).sum());
        response.setTotalSaturatedFat(productNutrilogs.stream().mapToDouble(ProductNutrilog::getSaturatedFat).sum() + recipeNutrilogs.stream().mapToDouble(RecipeNutrilog::getSaturatedFat).sum());
        response.setTotalUnsaturatedFat(productNutrilogs.stream().mapToDouble(ProductNutrilog::getUnsaturatedFat).sum() + recipeNutrilogs.stream().mapToDouble(RecipeNutrilog::getUnsaturatedFat).sum());

        return response;
    }

    public List<Double> getCaloriesHistoryForLast14Days(Integer userId) {
        LocalDate today = LocalDate.now();
        List<Double> caloriesHistory = new ArrayList<>();

        for (int i = 0; i < 14; i++) {
            LocalDate date = today.minusDays(i);
            NutrilogResponse nutrilogResponse = getNutrilogs(userId, date);
            caloriesHistory.add(nutrilogResponse.getTotalEnergyKcal());
        }

        return caloriesHistory;
    }

}
