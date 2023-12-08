package com.nutrifom.nutrifomapi.Weight;

import java.time.LocalDate;

public class WeightEntryDTO {
    private Integer weight;
    private LocalDate entryDate;

    // Getter und Setter
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }
}

