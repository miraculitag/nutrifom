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
        Optional<Nutrilog> existingNutrilog = nutrilogRepository.findByAppUserIdAndProductCodeAndEntryDate(appuser.getId(), productLogDTO.getProductCode(), productLogDTO.getEntryDate());
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
        Optional<Nutrilog> existingNutrilog = nutrilogRepository.findByAppUserIdAndRecipe_IdAndEntryDate(appuser.getId(), recipeLogDTO.getRecipeId(), recipeLogDTO.getEntryDate());
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
                Product product = offService.getProduct(nutrilog.getProductCode());
                double quantityFactor = nutrilog.getProductQuantity() / product.getProductQuantity();
                ProductNutrilog productNutrilog = new ProductNutrilog();
                productNutrilog.setProductCode(product.getCode());
                productNutrilog.setProductName(product.getProductName());
                productNutrilog.setProteins(product.getProteins() * quantityFactor);
                productNutrilog.setCarbohydrates(product.getCarbohydrates() * quantityFactor);
                productNutrilog.setEnergyKcal(product.getEnergyKcal() * quantityFactor);
                productNutrilog.setSaturatedFat(product.getSaturatedFat() * quantityFactor);
                productNutrilog.setUnsaturatedFat(product.getUnsaturatedFat() * quantityFactor);
                productNutrilog.setProductQuantity(nutrilog.getProductQuantity());
                productNutrilogs.add(productNutrilog);
            } else if (nutrilog.getRecipeId() != null) {
                // Fetch recipe details from Recipe table
                Recipe recipe = recipeRepository.findById(nutrilog.getRecipeId()).orElse(null);
                if (recipe != null) {
                    double portionFactor = (double) nutrilog.getRecipePortions() / recipe.getPortions();
                    RecipeNutrilog recipeNutrilog = new RecipeNutrilog();
                    recipeNutrilog.setRecipeId(recipe.getId());
                    recipeNutrilog.setRecipeTitle(recipe.getTitle());
                    recipeNutrilog.setPortions(nutrilog.getRecipePortions());
                    recipeNutrilog.setProteins(recipe.getProteins() * portionFactor);
                    recipeNutrilog.setCarbohydrates(recipe.getCarbohydrates() * portionFactor);
                    recipeNutrilog.setEnergyKcal(recipe.getEnergyKcal() * portionFactor);
                    recipeNutrilog.setSaturatedFat(recipe.getSaturatedFat() * portionFactor);
                    recipeNutrilog.setUnsaturatedFat(recipe.getUnsaturatedFat() * portionFactor);
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
