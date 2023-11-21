package com.nutrifom.nutrifomapi.Weight;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightEntryRepository extends JpaRepository<WeightEntry, Integer> {
    List<WeightEntry> findByAppUserIdOrderByEntryDateDesc(Integer userId);

}
