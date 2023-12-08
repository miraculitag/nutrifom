package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;

public class RecipeLogDTO {

    private Integer recipeId;
    private LocalDate entryDate;

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }
}
