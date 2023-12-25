package com.nutrifom.nutrifomapi.OpenFoodFacts;

import lombok.Getter;
import lombok.Setter;

public class Product {
    @Getter
    @Setter
    private String code;

    @Getter
    @Setter
    private String productName;

    @Getter
    @Setter
    private double productQuantity;

    @Getter
    @Setter
    private double proteins;

    @Getter
    @Setter
    private double carbohydrates;

    @Getter
    @Setter
    private double energyKcal;

    @Getter
    @Setter
    private double saturatedFat;

    @Getter
    @Setter
    private double unsaturatedFat;

}
