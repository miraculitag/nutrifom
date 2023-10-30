package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionLogRepository extends JpaRepository<NutritionLog, Integer> {
    List<NutritionLog> findByAppUserIdAndEntryDate(Integer appUserId, LocalDate entryDate);
}
