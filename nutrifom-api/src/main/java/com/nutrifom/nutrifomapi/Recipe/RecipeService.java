package com.nutrifom.nutrifomapi.Recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getRecipesByTag(String tag) {
        Specification<Recipe> spec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("tag"), tag);

        Sort sort = Sort.by(Sort.Direction.DESC, "rating");  // sortiert nach Bewertung absteigend

        return recipeRepository.findAll(spec, sort);
    }

}
