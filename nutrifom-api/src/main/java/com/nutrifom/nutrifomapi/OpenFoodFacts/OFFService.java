package com.nutrifom.nutrifomapi.OpenFoodFacts;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

        if (root == null) {
            throw new CustomAuthenticationException("No data received from API", HttpStatus.NOT_FOUND);
        }
        JsonNode products = root.path("products");
        List<Product> productList = new ArrayList<>();
        Set<String> productNames = new HashSet<>();

        for (JsonNode product : products) {
            String productName = product.path("product_name").asText();
            if (productName == null || productName.isEmpty() || productNames.contains(productName)) {
                continue;
            }

            Pattern pattern = Pattern.compile("(\\d+g)|x(\\d+)");
            Matcher matcher = pattern.matcher(productName);

            if (matcher.find()) {
                // Extrahieren Sie die Mengenangabe oder die Zahl nach dem "x"
                String quantityInName = matcher.group(1);
                String xNumber = matcher.group(2);

                // Überprüfen Sie, ob die Mengenangabe oder die product_quantity geteilt durch die Zahl nach dem "x" mit der product_quantity eines anderen Produkts übereinstimmt
                if (quantityInName != null && !quantityInName.equals(product.path("product_quantity").asText())) {
                    continue;
                }
                if (xNumber != null) {
                    String productNameWithoutX = productName.replace("x" + xNumber, "").trim();
                    if (productNames.contains(productNameWithoutX) && Integer.parseInt(xNumber) != product.path("product_quantity").asInt()) {
                        continue;
                    }
                }
            }



            String code = product.path("code").asText();
            if (product.has("serving_quantity") && product.has("product_quantity")) {
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
                double unsaturatedFat = fat - saturatedFat;

                Product p = new Product();
                p.setCode(code);
                p.setProductName(productName);
                p.setProduct_quantity(productQuantityDouble);
                p.setProteins(proteins);
                p.setCarbohydrates(carbohydrates);
                p.setEnergy_kcal(energyKcal);
                p.setSaturated_fat(saturatedFat);
                p.setUnsaturated_fat(unsaturatedFat);

                productList.add(p);
                productNames.add(productName);
            }
        }

        return productList;
    }
}
