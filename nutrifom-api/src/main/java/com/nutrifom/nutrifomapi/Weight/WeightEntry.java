package com.nutrifom.nutrifomapi.Weight;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nutrifom.nutrifomapi.AppUser.AppUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Weight")
public class WeightEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    @Getter
    @Setter
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "appUserId", nullable = false)
    @JsonIgnore
    @Getter
    @Setter
    private AppUser appUser;

    @Column(nullable = false)
    @Getter
    @Setter
    private double weight;

    @Column(name = "entryDate", nullable = false)
    @Getter
    @Setter
    private LocalDate entryDate;

}
