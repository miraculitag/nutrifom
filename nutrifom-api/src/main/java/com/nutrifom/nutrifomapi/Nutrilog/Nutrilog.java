package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nutrifom.nutrifomapi.AppUser.AppUser;

import com.nutrifom.nutrifomapi.Recipe.Recipe;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Nutrilog")
public class Nutrilog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "appUserId", nullable = true)
    @JsonIgnore
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "recipeId", nullable = true)
    @JsonIgnore
    private Recipe recipe;

    private String code;
    private String productName;
    private Double product_quantity;
    private Double serving_quantity;
    private Double proteins_serving;
    private Double carbohydrates_serving;
    private Double energy_kcal_serving;
    private Double saturated_fat_serving;
    private Double unsaturated_fat_serving;
    private LocalDate entryDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

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

    public Double getProduct_quantity() {
        return product_quantity;
    }

    public void setProduct_quantity(Double product_quantity) {
        this.product_quantity = product_quantity;
    }

    public Double getServing_quantity() {
        return serving_quantity;
    }

    public void setServing_quantity(Double serving_quantity) {
        this.serving_quantity = serving_quantity;
    }

    public Double getProteins_serving() {
        return proteins_serving;
    }

    public void setProteins_serving(Double proteins_serving) {
        this.proteins_serving = proteins_serving;
    }

    public Double getCarbohydrates_serving() {
        return carbohydrates_serving;
    }

    public void setCarbohydrates_serving(Double carbohydrates_serving) {
        this.carbohydrates_serving = carbohydrates_serving;
    }

    public Double getEnergy_kcal_serving() {
        return energy_kcal_serving;
    }

    public void setEnergy_kcal_serving(Double energy_kcal_serving) {
        this.energy_kcal_serving = energy_kcal_serving;
    }

    public Double getSaturated_fat_serving() {
        return saturated_fat_serving;
    }

    public void setSaturated_fat_serving(Double saturated_fat_serving) {
        this.saturated_fat_serving = saturated_fat_serving;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public Double getUnsaturated_fat_serving() {
        return unsaturated_fat_serving;
    }

    public void setUnsaturated_fat_serving(Double unsaturated_fat_serving) {
        this.unsaturated_fat_serving = unsaturated_fat_serving;
    }
}
