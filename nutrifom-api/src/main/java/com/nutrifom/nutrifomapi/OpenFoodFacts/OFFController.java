package com.nutrifom.nutrifomapi.OpenFoodFacts;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
