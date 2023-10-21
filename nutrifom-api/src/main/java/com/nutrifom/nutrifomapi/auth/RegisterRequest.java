package com.nutrifom.nutrifomapi.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private LocalDate dob;
    private Integer height;
    private Character gender;
    private String pal;
    private int weight;
    private String goal;
    private byte[] image;
    private String GoogleIDToken;
    private String email;
    private String password;

}
