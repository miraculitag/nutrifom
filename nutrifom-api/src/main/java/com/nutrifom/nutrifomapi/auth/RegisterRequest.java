package com.nutrifom.nutrifomapi.auth;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private LocalDate dob;
    private Integer height;
    private String gender;
    private double wpa;
    private String pal;
    private int weight;
    private String goal;
    private byte[] image;
    private String GoogleIDToken;
    private String email;
    private String password;

}
