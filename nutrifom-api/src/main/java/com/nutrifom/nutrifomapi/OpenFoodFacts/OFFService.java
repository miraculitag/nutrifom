package com.nutrifom.nutrifomapi.OpenFoodFacts;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OFFService {

    public List<Product> searchProducts(String searchTerm) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=" + searchTerm + "&search_simple=1&action=process&json=1^&fields=code,product_name,nutriments,quantity";

        // API-Aufruf
        JsonNode root = restTemplate.getForObject(url, JsonNode.class);

        // Datenextraktion
        assert root != null;
        JsonNode products = root.path("products");
        List<Product> productList = new ArrayList<>();

        for (JsonNode product : products) {
            String productName = product.path("product_name").asText();

            // Überspringe das Produkt, wenn kein Produktname vorhanden ist
            if (productName == null || productName.isEmpty()) {
                continue;
            }
            String code = product.path("code").asText();
            String productQuantity = product.path("quantity").asText();
            JsonNode nutriments = product.path("nutriments");

            double proteins = nutriments.path("proteins_100g").asDouble();
            double carbohydrates = nutriments.path("carbohydrates_100g").asDouble();
            double energyKcal = nutriments.path("energy-kcal_100g").asDouble();
            double fat = nutriments.path("fat_100g").asDouble();
            double saturatedFat = nutriments.path("saturated-fat_100g").asDouble();

            Product p = new Product();
            p.setCode(code);
            p.setProductName(productName);
            p.setProductQuantity(productQuantity);
            p.setProteins(proteins);
            p.setCarbohydrates(carbohydrates);
            p.setEnergyKcal(energyKcal);
            p.setFat(fat);
            p.setSaturatedFat(saturatedFat);

            productList.add(p);
        }

        return productList;
    }
}

