package com.sportsfinance.responsible.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Responsible {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private Long responsibleId;

    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String avatar;
    private LocalDate createDate = LocalDate.now();
    private LocalDate updateDate = LocalDate.now();
}
