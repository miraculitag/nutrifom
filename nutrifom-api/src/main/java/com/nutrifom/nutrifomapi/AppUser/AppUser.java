package com.nutrifom.nutrifomapi.AppUser;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nutrifom.nutrifomapi.token.Token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;


    @Column(name = "Name")
    private String name;

    @Column(name = "KcalGoal")
    private int kcalGoal;

    @Column(name = "InitialWeight")
    private int initialWeight;

    @Column(name = "DOB")
    private LocalDate dob;

    @Column(name = "Goal")
    private String goal;

    @Column(name = "Height")
    private Integer height;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "PAL")
    private String pal;

    @Column(name = "WPA")
    private double wpa;

    @Column(name = "Image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;

    @Column(name = "Email")
    private String email;

    @Column(name = "Password")
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Token> tokens;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
