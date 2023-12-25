package com.nutrifom.nutrifomapi.Recipe;

import lombok.Getter;
import lombok.Setter;

public class RecipeRatingDTO {

    @Getter
    @Setter
    private Integer recipeId;

    @Getter
    @Setter
    private Double score;

}

