package com.nutrifom.nutrifomapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication()
public class NutrifomApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(NutrifomApiApplication.class, args);
    }

}
