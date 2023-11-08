package com.nutrifom.nutrifomapi.OpenFoodFacts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("api/OFF")
@SecurityRequirement(name = "bearerAuth")
public class OFFController {
    @Autowired
    private OFFService offService;

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String searchTerm) {
        return offService.searchProducts(searchTerm);
    }
}
