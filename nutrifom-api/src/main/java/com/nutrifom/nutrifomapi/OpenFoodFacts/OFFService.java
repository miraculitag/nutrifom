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
                + "&search_simple=1&action=process&json=1^&fields=code,product_name,nutriments,product_quantity";

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
            if (!product.has("product_quantity")) {
                continue;
            }
            Double productQuantityDouble = convertToDouble(product.path("product_quantity").asText());

            if (productQuantityDouble == null || productQuantityDouble <= 0.0) {
                // handle the error, for example, skip this product
                continue;
            }

            JsonNode nutriments = product.path("nutriments");

            double proteins = roundToOneDecimalPlace(nutriments.path("proteins").asDouble());
            double carbohydrates = roundToOneDecimalPlace(
                    nutriments.path("carbohydrates").asDouble());
            double energyKcal = roundToOneDecimalPlace(
                    nutriments.path("energy-kcal").asDouble());
            double fat = roundToOneDecimalPlace(nutriments.path("fat").asDouble());
            double saturatedFat = roundToOneDecimalPlace(
                    nutriments.path("saturated-fat").asDouble());
            double unsaturatedFat = fat - saturatedFat;

            double proteinsPer100g = nutriments.path("proteins_100g").asDouble();
            double carbohydratesPer100g = nutriments.path("carbohydrates_100g").asDouble();
            double energyKcalPer100g = nutriments.path("energy-kcal_100g").asDouble();
            double saturatedFatPer100g = nutriments.path("saturated-fat_100g").asDouble();
            double unsaturatedFatPer100g = nutriments.path("fat_100g").asDouble() - saturatedFatPer100g;
            double fatPer100g = nutriments.path("fat_100g").asDouble();

            double adjustedProteins = validateAndAdjustNutrient(proteins, proteinsPer100g, productQuantityDouble);
            double adjustedCarbohydrates = validateAndAdjustNutrient(carbohydrates, carbohydratesPer100g, productQuantityDouble);
            double adjustedEnergyKcal = validateAndAdjustNutrient(energyKcal, energyKcalPer100g, productQuantityDouble);
            double adjustedSaturatedFat = validateAndAdjustNutrient(saturatedFat, saturatedFatPer100g, productQuantityDouble);
            double adjustedUnsaturatedFat = validateAndAdjustNutrient(unsaturatedFat, unsaturatedFatPer100g, productQuantityDouble);



            Product p = new Product();
            p.setProductCode(code);
            p.setProductName(productName);
            p.setProductQuantity(productQuantityDouble);
            p.setProteins(adjustedProteins);
            p.setCarbohydrates(adjustedCarbohydrates);
            p.setEnergyKcal(adjustedEnergyKcal);
            p.setSaturatedFat(adjustedSaturatedFat);
            p.setUnsaturatedFat(adjustedUnsaturatedFat);

            productList.add(p);
            productNames.add(productName);
        }

        return productList;
    }

    public Product getProduct(String productCode) throws CustomAuthenticationException {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://world.openfoodfacts.org/api/v2/search?code=" + productCode + "&fields=code,product_name,nutriments,product_quantity";

        // API-Aufruf
        JsonNode root;
        try {
            root = restTemplate.getForObject(url, JsonNode.class);
        } catch (Exception e) {
            throw new CustomAuthenticationException("Error while calling API", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (root == null) {
            throw new CustomAuthenticationException("No data received from API or product not found", HttpStatus.NOT_FOUND);
        }

        JsonNode productNode = root.path("products").get(0);
        JsonNode nutriments = productNode.path("nutriments");

        double proteinsPer100g = nutriments.path("proteins_100g").asDouble();
        double carbohydratesPer100g = nutriments.path("carbohydrates_100g").asDouble();
        double energyKcalPer100g = nutriments.path("energy-kcal_100g").asDouble();
        double saturatedFatPer100g = nutriments.path("saturated-fat_100g").asDouble();
        double unsaturatedFatPer100g = nutriments.path("fat_100g").asDouble() - saturatedFatPer100g;
        double fatPer100g = nutriments.path("fat_100g").asDouble();

        Product product = new Product();
        product.setProductCode(productNode.path("code").asText());
        product.setProductName(productNode.path("product_name").asText());
        product.setProductQuantity(productNode.path("product_quantity").asDouble());
        product.setProteins(validateAndAdjustNutrient(product.getProteins(), proteinsPer100g, product.getProductQuantity()));
        product.setCarbohydrates(validateAndAdjustNutrient(product.getCarbohydrates(), carbohydratesPer100g, product.getProductQuantity()));
        product.setEnergyKcal(validateAndAdjustNutrient(product.getEnergyKcal(), energyKcalPer100g, product.getProductQuantity()));
        product.setSaturatedFat(validateAndAdjustNutrient(product.getSaturatedFat(), saturatedFatPer100g, product.getProductQuantity()));
        product.setUnsaturatedFat(validateAndAdjustNutrient(product.getUnsaturatedFat(), unsaturatedFatPer100g, product.getProductQuantity()));

        return product;
    }

    public double validateAndAdjustNutrient(double nutrientValue, double nutrientValuePer100g, double productQuantity) {
        if (productQuantity > 0) {
            double expectedNutrientValue = (nutrientValuePer100g * productQuantity) / 100;
            if (Math.abs(expectedNutrientValue - nutrientValue) > 1e-2) { // Ein kleiner Toleranzbereich
                return roundToOneDecimalPlace(expectedNutrientValue);
            }
        }
        return nutrientValue;
    }

}
