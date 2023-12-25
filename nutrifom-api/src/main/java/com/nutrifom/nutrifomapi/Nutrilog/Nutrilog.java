package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nutrifom.nutrifomapi.AppUser.AppUser;

import com.nutrifom.nutrifomapi.Recipe.Recipe;
import com.nutrifom.nutrifomapi.Recipe.RecipeRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Nutrilog")
public class Nutrilog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    @Getter
    private Integer id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "appUserId", nullable = false)
    @JsonIgnore
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "recipeId", nullable = true)
    @JsonIgnore
    @Getter
    @Setter
    private Recipe recipe;

    @Getter
    @Setter
    private String productCode;

    @Getter
    @Setter
    private Double productQuantity;

    @Getter
    @Setter
    private Integer recipePortions;

    @Getter
    @Setter
    private LocalDate entryDate;

    public Integer getRecipeId() {
        return recipe.getId();
    }

}
