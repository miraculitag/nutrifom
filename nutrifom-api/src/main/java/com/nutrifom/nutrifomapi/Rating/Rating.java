package com.nutrifom.nutrifomapi.Rating;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.Recipe.Recipe;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    private Double score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appUserId")
    @Getter
    @Setter
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    @JsonBackReference
    @JsonIgnore
    @Getter
    @Setter
    private Recipe recipe;

}
