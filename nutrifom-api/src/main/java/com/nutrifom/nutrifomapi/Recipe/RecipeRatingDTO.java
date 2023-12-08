package com.nutrifom.nutrifomapi.Recipe;

public class RecipeRatingDTO {
    private Integer recipeId;
    private Double score;

    // Getter und Setter
    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}

