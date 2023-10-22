package com.nutrifom.nutrifomapi.Nutrilog;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface NutritionLogRepository extends JpaRepository<NutritionLog, Integer> {
    List<NutritionLog> findByAppUserIdAndEntryDate(Integer appUserId, LocalDate entryDate);
}

