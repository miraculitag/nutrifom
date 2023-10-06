package com.nutrifom.nutrifomapi.OpenFoodFacts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("nutrifom-api/OFF")
public class OFFController {
    @Autowired
    private OFFService offService;

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String searchTerm) {
        return offService.searchProducts(searchTerm);
    }
}
