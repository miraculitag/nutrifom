package com.nutrifom.nutrifomapi.AppUser;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;

@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Weight")
    private int weight;

    @Column(name = "DOB")
    private LocalDate dob;

    @Transient
    private Integer age;

    @Column(name = "Goal")
    private String goal;

    @Column(name = "Image_Blob_Url")
    private String imageBlobUrl;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getImageBlobUrl() {
        return imageBlobUrl;
    }

    public void setImageBlobUrl(String imageBlobUrl) {
        this.imageBlobUrl = imageBlobUrl;
    }
}
