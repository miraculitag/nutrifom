package com.nutrifom.nutrifomapi.AppUser;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;
    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public Optional<AppUser> getAppUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public AppUser updateAppUser(Integer id, AppUser updatedAppUser) {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User with ID " + id + " doesn't exist"));

        existingAppUser.setDob(updatedAppUser.getDob());
        existingAppUser.setWeight(updatedAppUser.getWeight());
        existingAppUser.setGoal(updatedAppUser.getGoal());

        // Allow image to be set later or updated
        if (updatedAppUser.getImageBlobUrl() != null) {
            existingAppUser.setImageBlobUrl(updatedAppUser.getImageBlobUrl());
        }

        return appUserRepository.save(existingAppUser);
    }

    public ResponseEntity<String> updateAppUserGoal(String email, String updatedGoal) {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findByEmail(email);

        if (!existingAppUserOptional.isPresent()) {
            return new ResponseEntity<>("User with email " + email + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setGoal(updatedGoal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated goal: " + updatedGoal + " for " + email, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserWeight(String email, int updatedWeight) {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findByEmail(email);

        if (!existingAppUserOptional.isPresent()) {
            return new ResponseEntity<>("User with email " + email + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setWeight(updatedWeight);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated Weight: " + updatedWeight + " for " + email, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserPal(String email, String updatedPal) {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findByEmail(email);

        if (!existingAppUserOptional.isPresent()) {
            return new ResponseEntity<>("User with email " + email + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setPal(updatedPal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated PAL: " + updatedPal + " for " + email, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserImageBlobUrl(String email, String updatedImageBlobUrl) {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findByEmail(email);

        if (!existingAppUserOptional.isPresent()) {
            return new ResponseEntity<>("User with email " + email + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setImageBlobUrl(updatedImageBlobUrl);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated Image: " + updatedImageBlobUrl + " for " + email, HttpStatus.OK);
    }



    public void deleteAppUserByEmail(String email) {
        Optional<AppUser> foundUser = appUserRepository.findByEmail(email);
        if (!foundUser.isPresent()) {
            throw new IllegalStateException("User with email " + email + " doesn't exist");
        }
        appUserRepository.deleteById(foundUser.get().getId());
    }
}
