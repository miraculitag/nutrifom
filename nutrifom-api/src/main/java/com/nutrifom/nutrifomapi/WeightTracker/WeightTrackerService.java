package com.nutrifom.nutrifomapi.WeightTracker;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WeightTrackerService {
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
}
