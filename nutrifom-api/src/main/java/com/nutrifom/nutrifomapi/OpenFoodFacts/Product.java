package com.nutrifom.nutrifomapi.OpenFoodFacts;

public class Product {
    private String code;
    private String productName;

    private double product_quantity;
    private double serving_quantity;
    private double proteins_serving;
    private double carbohydrates_serving;
    private double energy_kcal_serving;
    private double fat_serving;
    private double saturated_fat_serving;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getProduct_quantity() {
        return product_quantity;
    }

    public void setProduct_quantity(double productQuantity) {
        this.product_quantity = productQuantity;
    }

    public double getServing_quantity() {
        return serving_quantity;
    }

    public void setServing_quantity(double serving_quantity) {
        this.serving_quantity = serving_quantity;
    }

    public double getProteins_serving() {
        return proteins_serving;
    }

    public void setProteins_serving(double proteins_serving) {
        this.proteins_serving = proteins_serving;
    }

    public double getCarbohydrates_serving() {
        return carbohydrates_serving;
    }

    public void setCarbohydrates_serving(double carbohydrates_serving) {
        this.carbohydrates_serving = carbohydrates_serving;
    }

    public double getEnergy_kcal_serving() {
        return energy_kcal_serving;
    }

    public void setEnergy_kcal_serving(double energy_kcal_serving) {
        this.energy_kcal_serving = energy_kcal_serving;
    }

    public double getFat_serving() {
        return fat_serving;
    }

    public void setFat_serving(double fat_serving) {
        this.fat_serving = fat_serving;
    }

    public double getSaturated_fat_serving() {
        return saturated_fat_serving;
    }

    public void setSaturated_fat_serving(double saturated_fat_serving) {
        this.saturated_fat_serving = saturated_fat_serving;
    }
}
