package com.skillverify.profileinfoservice.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Slf4j
@Builder
public class ProfileView {
	

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Long viewerUserId; // The person who viewed the profile
    private String viewerName; // Optional – if you want to show name
    private String viewerPhotoUrl; // Optional – if you want to display avatar
    private LocalDateTime viewedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_info_id")
    @JsonBackReference 
    private ProfileInfo profileInfo; // The profi
	

}
