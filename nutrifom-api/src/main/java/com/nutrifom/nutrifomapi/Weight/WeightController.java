package com.nutrifom.nutrifomapi.Weight;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import com.nutrifom.nutrifomapi.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("api/weight")
@SecurityRequirement(name = "bearerAuth")
public class WeightController {

    @Autowired
    private WeightService weightService;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/history")
    public ResponseEntity<List<WeightEntry>> getWeightHistory(Principal principal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            AppUser appUser = appUserRepository.findById(userId).orElse(null);
            if (appUser == null) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            List<WeightEntry> weightHistory = weightService.getWeightHistory(appUser);
            return ResponseEntity.ok(weightHistory);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    @PostMapping("/entry")
    public ResponseEntity<?> addWeightEntry(Principal principal, @RequestBody WeightEntryDTO weightEntryDTO) {
        try {
            String username = principal.getName();
            Optional<AppUser> userOptional = jwtService.getAppUserFromToken(username);

            if (!userOptional.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }

            int userId = userOptional.get().getId();
            Optional<AppUser> appUserOptional = appUserRepository.findById(userId);

            if (!appUserOptional.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }

            weightService.addOrUpdateWeightEntry(appUserOptional.get(), weightEntryDTO.getWeight(), weightEntryDTO.getEntryDate());
            return ResponseEntity.ok("Weight entry added successfully");
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("/last14Days")
    public ResponseEntity<List<Double>> getLast14DaysWeightHistory(Principal principal) {
        try {
            String username = principal.getName();
            Optional<AppUser> user = jwtService.getAppUserFromToken(username);
            if (!user.isPresent()) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            int userId = user.get().getId();
            if (!appUserRepository.existsById(userId)) {
                throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
            }
            List<Double> weightHistoryForLast14Days = weightService.getWeightHistoryForLast14Days(userId);
            return new ResponseEntity<>(weightHistoryForLast14Days, HttpStatus.OK);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }
}
