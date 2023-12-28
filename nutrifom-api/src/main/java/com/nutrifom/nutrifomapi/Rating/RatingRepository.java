package com.nutrifom.nutrifomapi.Rating;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    Optional<Rating> findByAppUserIdAndRecipeId(Integer appUserId, Integer recipeId);
    List<Rating> findByRecipeId(Integer recipeId);

    Integer countByRecipeId(Integer recipeId);
}
