package com.nutrifom.nutrifomapi.OpenFoodFacts;

public class Product {
    private String code;
    private String productName;

    private double product_quantity;
    private double proteins;
    private double carbohydrates;
    private double energy_kcal;
    private double saturated_fat;
    private double unsaturated_fat;

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

    public double getProteins() {
        return proteins;
    }

    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public double getEnergy_kcal() {
        return energy_kcal;
    }

    public void setEnergy_kcal(double energy_kcal) {
        this.energy_kcal = energy_kcal;
    }


    public double getSaturated_fat() {
        return saturated_fat;
    }

    public void setSaturated_fat(double saturated_fat) {
        this.saturated_fat = saturated_fat;
    }

    public double getUnsaturated_fat() {
        return unsaturated_fat;
    }

    public void setUnsaturated_fat(double unsaturated_fat) {
        this.unsaturated_fat = unsaturated_fat;
    }
}
