package com.nutrifom.nutrifomapi.Recipe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nutrifom.nutrifomapi.Rating.Rating;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private String title;
    @Column(length = Integer.MAX_VALUE, columnDefinition = "VARCHAR(MAX)")
    @Getter
    @Setter
    private String ingredients;
    @Getter
    @Setter
    private Double proteins;
    @Getter
    @Setter
    private Double carbohydrates;
    @Getter
    @Setter
    private Double energyKcal;
    @Getter
    @Setter
    private Integer portions;
    @Getter
    @Setter
    private Double unsaturatedFat;

    @Getter
    @Setter
    private Double saturatedFat;
    @Column(length = Integer.MAX_VALUE, columnDefinition = "VARCHAR(MAX)")
    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private int uses;

    @Getter
    @Setter
    private Double averageRating;


    @Column(name = "Image", columnDefinition = "VARBINARY(MAX)")
    @Getter
    @Setter
    private byte[] image;

    @Getter
    @Setter
    private String tag;

    @Transient
    @Getter
    @Setter
    private long ratingCount;

}
