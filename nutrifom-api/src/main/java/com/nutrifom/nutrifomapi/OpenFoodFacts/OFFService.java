package com.nutrifom.nutrifomapi.OpenFoodFacts;

import java.util.ArrayList;
import java.util.List;

import com.nutrifom.nutrifomapi.auth.CustomAuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

@Service
public class OFFService {

    public Double convertToDouble(Object value) throws CustomAuthenticationException {
        if (value instanceof Integer) {
            return ((Integer) value).doubleValue();
        } else if (value instanceof String) {
            try {
                return Double.parseDouble((String) value);
            } catch (NumberFormatException e) {
                throw new CustomAuthenticationException("Error while converting to double", HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new CustomAuthenticationException("Unexpected type", HttpStatus.BAD_REQUEST);
        }
    }

    public double roundToOneDecimalPlace(double value) {
        return Math.round(value * 10.0) / 10.0;
    }

    public List<Product> searchProducts(String searchTerm) throws CustomAuthenticationException {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=" + searchTerm
                + "&search_simple=1&action=process&json=1^&fields=code,product_name,nutriments,product_quantity,serving_quantity";

        // API-Aufruf
        JsonNode root;
        try {
            root = restTemplate.getForObject(url, JsonNode.class);
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error while calling API", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Datenextraktion
        if (root == null) {
            throw new CustomAuthenticationException("No data received from API", HttpStatus.NOT_FOUND);
        }
        JsonNode products = root.path("products");
        List<Product> productList = new ArrayList<>();

        for (JsonNode product : products) {
            String productName = product.path("product_name").asText();

            // Überspringe das Produkt, wenn kein Produktname vorhanden ist
            if (productName == null || productName.isEmpty()) {
                continue;
            }
            String code = product.path("code").asText();
            Double productQuantityDouble = convertToDouble(product.path("product_quantity").asText());
            Double servingQuantityDouble = convertToDouble(product.path("serving_quantity").asText());

            if (productQuantityDouble == null || servingQuantityDouble == null || servingQuantityDouble == 0) {
                // handle the error, for example, skip this product
                continue;
            }

            Double quantityFactor = productQuantityDouble / servingQuantityDouble;
            JsonNode nutriments = product.path("nutriments");

            double proteins = roundToOneDecimalPlace(nutriments.path("proteins_serving").asDouble() * quantityFactor);
            double carbohydrates = roundToOneDecimalPlace(
                    nutriments.path("carbohydrates_serving").asDouble() * quantityFactor);
            double energyKcal = roundToOneDecimalPlace(
                    nutriments.path("energy-kcal_serving").asDouble() * quantityFactor);
            double fat = roundToOneDecimalPlace(nutriments.path("fat_serving").asDouble() * quantityFactor);
            double saturatedFat = roundToOneDecimalPlace(
                    nutriments.path("saturated-fat_serving").asDouble() * quantityFactor);
            double unsaturatedFat = fat-saturatedFat;

            Product p = new Product();
            p.setCode(code);
            p.setProductName(productName);
            p.setProduct_quantity(productQuantityDouble);
            p.setServing_quantity(servingQuantityDouble);
            p.setProteins_serving(proteins);
            p.setCarbohydrates_serving(carbohydrates);
            p.setEnergy_kcal_serving(energyKcal);
            p.setSaturated_fat_serving(saturatedFat);
            p.setUnsaturated_fat_serving(unsaturatedFat);

            productList.add(p);
        }

        return productList;
    }
}
