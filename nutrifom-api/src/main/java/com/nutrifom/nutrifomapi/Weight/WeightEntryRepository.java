package com.nutrifom.nutrifomapi.Weight;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightEntryRepository extends JpaRepository<WeightEntry, Integer> {
    List<WeightEntry> findByAppUserIdOrderByEntryDateDesc(Integer userId);
    Optional<WeightEntry> findByAppUserIdAndEntryDate(Integer appUserId, LocalDate entryDate);

    void deleteByAppUserId(Integer userId);


}
