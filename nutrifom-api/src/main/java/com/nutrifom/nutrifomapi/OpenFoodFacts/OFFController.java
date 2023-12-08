package com.nutrifom.nutrifomapi.OpenFoodFacts;

import java.util.ArrayList;
import java.util.List;

import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String searchTerm) {
        try {
            List<Product> products = offService.searchProducts(searchTerm);
            return ResponseEntity.ok(products);
        } catch (CustomAuthenticationException e) {
            return ResponseEntity.status(e.getHttpStatus()).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }
}
