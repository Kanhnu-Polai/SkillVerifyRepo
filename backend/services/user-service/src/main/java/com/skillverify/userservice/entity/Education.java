package com.skillverify.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree; // e.g., 10th, 12th, B.Sc, M.Sc
    private String fieldOfStudy;
    private String institution;
    private String startYear;
    private String endYear;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserData user;
}