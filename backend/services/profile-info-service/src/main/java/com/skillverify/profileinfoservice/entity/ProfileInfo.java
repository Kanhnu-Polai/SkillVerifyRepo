package com.skillverify.profileinfoservice.entity;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Builder
public class ProfileInfo {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Long userId; 

    @OneToMany(mappedBy = "profileInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProfileView> profileViews;  // List of users who viewed this profile
}
	


