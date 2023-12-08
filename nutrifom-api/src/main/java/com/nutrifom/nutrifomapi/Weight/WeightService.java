package com.nutrifom.nutrifomapi.Weight;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    public void addWeightEntry(AppUser appUser, int weight, LocalDate entryDate) throws CustomAuthenticationException {
        if (weight < 0) {
            throw new CustomAuthenticationException("Weight cannot be negative", HttpStatus.BAD_REQUEST);
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
            throw new CustomAuthenticationException("Error while adding weight entry", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<WeightEntry> getWeightHistory(AppUser appUser) throws CustomAuthenticationException {
        if (appUser == null) {
            throw new CustomAuthenticationException("AppUser must not be null", HttpStatus.BAD_REQUEST);
        }

        try {
            return weightEntryRepository.findByAppUserIdOrderByEntryDateDesc(appUser.getId());
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error retrieving weight history", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<Double> getWeightHistoryForLast14Days(Integer appUserId) throws CustomAuthenticationException {
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
            throw new CustomAuthenticationException("Error while getting weight history for last 14 days", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

