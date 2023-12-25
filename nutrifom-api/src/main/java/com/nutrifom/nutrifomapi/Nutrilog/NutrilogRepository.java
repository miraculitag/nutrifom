package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NutrilogRepository extends JpaRepository<Nutrilog, Integer> {
    List<Nutrilog> findByAppUserIdAndEntryDate(Integer appUserId, LocalDate entryDate);
    Optional<Nutrilog> findByAppUserIdAndRecipe_Id(Integer appUserId, Integer recipeId);
    Optional<Nutrilog> findByAppUserIdAndProductCode(Integer appUserId, String productCode);

}
