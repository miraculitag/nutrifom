package com.nutrifom.nutrifomapi.WeightTracker;

import com.nutrifom.nutrifomapi.AppUser.AppUser;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "WeightTracker")
public class WeightEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "appUser_id", nullable = false)
    private AppUser appUser;

    @Column(nullable = false)
    private int weight;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }
}
