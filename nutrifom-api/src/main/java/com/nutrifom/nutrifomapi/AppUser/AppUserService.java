package com.nutrifom.nutrifomapi.AppUser;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public ResponseEntity<String> updateAppUserWpa(String email, String updatedWpa) {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findByEmail(email);

        if (!existingAppUserOptional.isPresent()) {
            return new ResponseEntity<>("User with email " + email + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setWpa(updatedWpa);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated WPA: " + updatedWpa + " for " + email, HttpStatus.OK);
    }

    public HttpStatus updateAppUserImage(String email, MultipartFile file) {
        AppUser existingAppUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User with email " + email + " doesn't exist"));

        try {
            byte[] bytes = file.getBytes();
            existingAppUser.setImage(bytes);
            appUserRepository.save(existingAppUser);
            return HttpStatus.OK;
        } catch (IOException e) {
            // Fehlerbehandlung
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public byte[] getAppUserImage(String email) {
        AppUser existingAppUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User with email " + email + " doesn't exist"));

        byte[] imageData = existingAppUser.getImage();

        if (imageData == null) {
            throw new IllegalStateException("No image found for user with email " + email);
        }

        return imageData;
    }

    public void deleteAppUserByEmail(String email) {
        Optional<AppUser> foundUser = appUserRepository.findByEmail(email);
        if (!foundUser.isPresent()) {
            throw new IllegalStateException("User with email " + email + " doesn't exist");
        }
        appUserRepository.deleteById(foundUser.get().getId());
    }

}
