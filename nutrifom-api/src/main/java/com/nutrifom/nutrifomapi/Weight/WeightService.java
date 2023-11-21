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
        WeightEntry entry = new WeightEntry();
        entry.setAppUser(appUser);
        entry.setWeight(weight);
        entry.setEntryDate(entryDate);
        weightEntryRepository.save(entry);

        appUser.setWeight(weight);
        appUserRepository.save(appUser);
    }

    public List<WeightEntry> getWeightHistory(AppUser appUser) {
        return weightEntryRepository.findByAppUserIdOrderByEntryDateDesc(appUser.getId());
    }

    public List<Double> getWeightHistoryForLast14Days(Integer appUserId) {
        List<WeightEntry> entries = weightEntryRepository.findByAppUserIdOrderByEntryDateDesc(appUserId);

        LocalDate startDate = LocalDate.now().minusDays(13);
        List<Double> last14DaysWeights = new ArrayList<>();

        for (int i = 0; i < 14; i++) {
            LocalDate dateToCheck = startDate.plusDays(i);
            WeightEntry entryForDate = entries.stream()
                    .filter(e -> e.getEntryDate().equals(dateToCheck))
                    .findFirst()
                    .orElse(null);

            last14DaysWeights.add(entryForDate != null ? entryForDate.getWeight() : 0);
        }

        return last14DaysWeights;
    }
}
