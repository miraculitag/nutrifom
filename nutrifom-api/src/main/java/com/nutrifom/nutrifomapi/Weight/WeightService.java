package com.nutrifom.nutrifomapi.Weight;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WeightService {
    @Autowired
    private WeightEntryRepository weightEntryRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public void addWeightEntry(AppUser appUser, int weight, LocalDate entryDate) {
        if (weight < 0) {
            throw new IllegalArgumentException("Weight cannot be negative");
        }

        try {
            WeightEntry entry = new WeightEntry();
            entry.setAppUser(appUser);
            entry.setWeight(weight);
            entry.setEntryDate(entryDate);
            weightEntryRepository.save(entry);

            appUser.setWeight(weight);
            appUserRepository.save(appUser);
        } catch (Exception e) {
            // Loggen Sie hier den Fehler
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public List<WeightEntry> getWeightHistory(AppUser appUser) {
        if (appUser == null) {
            throw new IllegalArgumentException("AppUser must not be null");
        }

        try {
            return weightEntryRepository.findByAppUserIdOrderByEntryDateDesc(appUser.getId());
        } catch (Exception e) {
            // Loggen Sie hier den Fehler. Beispielsweise:
            // Log.error("Error retrieving weight history for user ID: " + appUser.getId(), e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public List<Double> getWeightHistoryForLast14Days(Integer appUserId) {
        try {
            List<WeightEntry> entries = weightEntryRepository.findByAppUserIdOrderByEntryDateDesc(appUserId);

            LocalDate startDate = LocalDate.now().minusDays(13);
            List<Double> last14DaysWeights = new ArrayList<>();

            for (int i = 0; i < 14; i++) {
                LocalDate dateToCheck = startDate.plusDays(i);
                double weightForDate = entries.stream()
                        .filter(e -> e.getEntryDate().equals(dateToCheck))
                        .findFirst()
                        .map(WeightEntry::getWeight)
                        .orElse(0.0);

                last14DaysWeights.add(weightForDate);
            }

            return last14DaysWeights;
        } catch (Exception e) {
            // Loggen Sie hier den Fehler
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    // ... restliche Methoden
}

