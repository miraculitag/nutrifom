package com.nutrifom.nutrifomapi.Nutrilog;

import com.nutrifom.nutrifomapi.OpenFoodFacts.Product;

import java.time.LocalDate;

public class ProductLogDTO {

    private Product product;
    private LocalDate entryDate;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }
}
