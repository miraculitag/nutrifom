package com.nutrifom.nutrifomapi.Nutrilog;

import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public class ProductLogDTO {

    @Getter
    @Setter
    private String productCode;

    @Getter
    @Setter
    private LocalDate entryDate;

    @Getter
    @Setter
    private Double productQuantity;
}
