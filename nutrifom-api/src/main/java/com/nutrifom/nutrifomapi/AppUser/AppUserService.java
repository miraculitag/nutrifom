package com.nutrifom.nutrifomapi.AppUser;

import java.io.IOException;
import java.util.Optional;

import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public ResponseEntity<String> updateAppUserGoal(int id, String updatedGoal) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setGoal(updatedGoal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated goal: " + updatedGoal + " for userid: " + id, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserWeight(int id, int updatedWeight) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setWeight(updatedWeight);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated Weight: " + updatedWeight + " for userid: " + id, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserPal(int id, String updatedPal) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setPal(updatedPal);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated PAL: " + updatedPal + " for userid: " + id, HttpStatus.OK);
    }

    public ResponseEntity<String> updateAppUserWpa(int id, double updatedWpa) throws CustomAuthenticationException {
        Optional<AppUser> existingAppUserOptional = appUserRepository.findById(id);

        if (!existingAppUserOptional.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }

        AppUser existingAppUser = existingAppUserOptional.get();
        existingAppUser.setWpa(updatedWpa);
        appUserRepository.save(existingAppUser);

        return new ResponseEntity<>("Updated WPA: " + updatedWpa + " for userid:" + id, HttpStatus.OK);
    }

    public HttpStatus updateAppUserImage(int id, MultipartFile file) throws CustomAuthenticationException {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomAuthenticationException("User with userid " + id + " doesn't exist", HttpStatus.NOT_FOUND));

        try {
            byte[] bytes = file.getBytes();
            existingAppUser.setImage(bytes);
            appUserRepository.save(existingAppUser);
            return HttpStatus.OK;
        } catch (IOException e) {
            // Fehlerbehandlung
            throw new CustomAuthenticationException("Error while updating image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public byte[] getAppUserImage(int id) throws CustomAuthenticationException {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND));

        byte[] imageData = existingAppUser.getImage();

        if (imageData == null) {
            throw new CustomAuthenticationException("No image found for user with userid " + id, HttpStatus.NOT_FOUND);
        }

        return imageData;
    }

    public void deleteAppUser(int id) throws CustomAuthenticationException {
        Optional<AppUser> foundUser = appUserRepository.findById(id);
        if (!foundUser.isPresent()) {
            throw new CustomAuthenticationException("User with id " + id + " doesn't exist", HttpStatus.NOT_FOUND);
        }
        appUserRepository.deleteById(foundUser.get().getId());
    }
}
