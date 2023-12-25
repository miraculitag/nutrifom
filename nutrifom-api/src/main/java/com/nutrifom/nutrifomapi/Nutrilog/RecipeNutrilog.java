package com.nutrifom.nutrifomapi.Nutrilog;

import lombok.Getter;
import lombok.Setter;

public class RecipeNutrilog {

    @Getter
    @Setter
    private Integer recipeId;

    @Getter
    @Setter
    private String recipeTitle;

    @Getter
    @Setter
    private Double proteins;

    @Getter
    @Setter
    private Double carbohydrates;

    @Getter
    @Setter
    private Double energyKcal;

    @Getter
    @Setter
    private Double saturatedFat;

    @Getter
    @Setter
    private Double unsaturatedFat;

    @Getter
    @Setter
    private Integer portions;
}
