package com.nutrifom.nutrifomapi.Weight;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public class WeightEntryDTO {

    @Getter
    @Setter
    private Integer weight;

    @Getter
    @Setter
    private LocalDate entryDate;

}

