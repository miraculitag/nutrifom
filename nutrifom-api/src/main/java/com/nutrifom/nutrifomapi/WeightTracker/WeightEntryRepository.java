package com.nutrifom.nutrifomapi.WeightTracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeightEntryRepository extends JpaRepository<WeightEntry, Integer> {
    List<WeightEntry> findByAppUserIdOrderByEntryDateDesc(Integer userId);

}
