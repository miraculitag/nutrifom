package com.nutrifom.nutrifomapi.Weight;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        if (appUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<WeightEntry> weightHistory = weightService.getWeightHistory(appUser);
        return new ResponseEntity<>(weightHistory, HttpStatus.OK);
    }

    @PostMapping("/entry")
    public ResponseEntity<?> addWeightEntry(Principal principal, @RequestBody WeightEntryDTO weightEntryDTO) {

        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> userOptional = jwtService.getAppUserFromToken(username);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: User not found in token.");
        }

        int userId = userOptional.get().getId();
        Optional<AppUser> appUserOptional = appUserRepository.findById(userId);

        if (!appUserOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found in database.");
        }

        try {
            weightService.addWeightEntry(appUserOptional.get(), weightEntryDTO.getWeight(), weightEntryDTO.getEntryDate());
            return ResponseEntity.ok("Weight entry added successfully");
        } catch (Exception e) {
            // Loggen Sie die Ausnahme und senden Sie eine allgemeine Fehlermeldung zurück.
            // Log.error("Error adding weight entry", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



    @GetMapping("/last14Days")
    public ResponseEntity<List<Double>> getLast14DaysWeightHistory(Principal principal) {
        String username = principal.getName(); // Hier ist die E-Mail-Adresse
        Optional<AppUser> user = jwtService.getAppUserFromToken(username);
        int userId = user.get().getId();
        if (!appUserRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Double> weightHistoryForLast14Days = weightService.getWeightHistoryForLast14Days(userId);
        return new ResponseEntity<>(weightHistoryForLast14Days, HttpStatus.OK);
    }
}
