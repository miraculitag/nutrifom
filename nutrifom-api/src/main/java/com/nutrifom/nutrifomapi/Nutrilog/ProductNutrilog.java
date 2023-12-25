package com.nutrifom.nutrifomapi.Nutrilog;

import lombok.Getter;
import lombok.Setter;

public class ProductNutrilog {

    @Getter
    @Setter
    private String productCode;

    @Getter
    @Setter
    private String productName;

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
    private Double productQuantity;

}
