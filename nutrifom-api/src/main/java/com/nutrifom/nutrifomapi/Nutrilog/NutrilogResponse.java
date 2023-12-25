package com.nutrifom.nutrifomapi.Nutrilog;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class NutrilogResponse {

    @Getter
    @Setter
    private List<ProductNutrilog> products;

    @Getter
    @Setter
    private List<RecipeNutrilog> recipes;

    @Getter
    @Setter
    private Double totalProteins;

    @Getter
    @Setter
    private Double totalCarbohydrates;

    @Getter
    @Setter
    private Double totalEnergyKcal;

    @Getter
    @Setter
    private Double totalSaturatedFat;

    @Getter
    @Setter
    private Double totalUnsaturatedFat;
}
