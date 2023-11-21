package com.nutrifom.nutrifomapi.Nutrilog;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NutrilogRepository extends JpaRepository<Nutrilog, Integer> {
    List<Nutrilog> findByAppUserIdAndEntryDate(Integer appUserId, LocalDate entryDate);
}
