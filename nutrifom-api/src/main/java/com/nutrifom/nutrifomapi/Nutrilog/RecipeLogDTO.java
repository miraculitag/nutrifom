package com.nutrifom.nutrifomapi.Nutrilog;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public class RecipeLogDTO {

    @Getter
    @Setter
    private Integer recipeId;

    @Getter
    @Setter
    private LocalDate entryDate;

    @Getter
    @Setter
    private Integer recipePortions;
}
