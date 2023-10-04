package com.nutrifom.nutrifomapi.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<AppUser> getAppUsers() {
        return appUserRepository.findAll();
    }

    public Optional<AppUser> getAppUserByID(Integer id) {
        return appUserRepository.findById(id);
    }

    public AppUser addAppUser(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    public AppUser updateAppUser(Integer id, AppUser updatedAppUser) {
        AppUser existingAppUser = appUserRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User with ID " + id + " doesn't exist"));

        existingAppUser.setName(updatedAppUser.getName());
        existingAppUser.setDob(updatedAppUser.getDob());
        existingAppUser.setWeight(updatedAppUser.getWeight());
        existingAppUser.setGoal(updatedAppUser.getGoal());

        // Allow image to be set later or updated
        if (updatedAppUser.getImageBlobUrl() != null) {
            existingAppUser.setImageBlobUrl(updatedAppUser.getImageBlobUrl());
        }

        return appUserRepository.save(existingAppUser);
    }



    public void deleteAppUser(Integer appUserID) {
        boolean exists = appUserRepository.existsById(appUserID);
        if (!exists) {
            throw new IllegalStateException("User with ID " + appUserID + " doesn't exist");
        }
        appUserRepository.deleteById(appUserID);
    }
}
