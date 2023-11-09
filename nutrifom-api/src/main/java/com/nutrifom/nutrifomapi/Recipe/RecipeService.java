package com.nutrifom.nutrifomapi.Recipe;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import com.nutrifom.nutrifomapi.AppUser.AppUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public List<Recipe> getRecipesByTag(String tag) {
        Specification<Recipe> spec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("tag"), tag);

        Sort sort = Sort.by(Sort.Direction.DESC, "rating");  // sortiert nach Bewertung absteigend

        return recipeRepository.findAll(spec, sort);
    }

    public Recipe rateRecipe(Integer recipeId, Integer userId, Double score) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Rezept nicht gefunden"));
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Benutzer nicht gefunden"));

        Optional<Rating> existingRating = recipe.getRatings().stream()
                .filter(r -> r.getAppUser().getId() == userId)
                .findFirst();

        if (existingRating.isPresent()) {
            existingRating.get().setScore(score);
        } else {
            Rating newRating = new Rating();
            newRating.setAppUser(user);
            newRating.setScore(score);
            newRating.setRecipe(recipe);
            recipe.getRatings().add(newRating);
        }

        // Berechne das durchschnittliche Rating und speichere es im Recipe-Objekt
        double averageRating = recipe.getRatings().stream()
                .mapToDouble(Rating::getScore)
                .average()
                .orElse(0.0);

        recipe.setAverageRating(averageRating); // Setze das durchschnittliche Rating

        return recipeRepository.save(recipe); // Speichere das aktualisierte Rezept
    }

    public Recipe incrementRecipeUses(Integer recipeId) {
        // Rezept nach ID suchen
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Rezept nicht gefunden"));

        // Click-Wert um eins erhöhen
        recipe.setUses(recipe.getUses() + 1);

        // Rezept mit aktualisiertem Click-Wert speichern
        return recipeRepository.save(recipe);
    }


}
