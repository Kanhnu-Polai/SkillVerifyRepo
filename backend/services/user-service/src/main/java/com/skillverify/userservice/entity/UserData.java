package com.skillverify.userservice.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserData {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String fullName;
    private String email;
    private String phone;
    private String bio;
    private String photoUrl;
    private String role;
    private String resumeLink;
    private String linkedinUrl;
    private String githubUrl;
    private String facebookUrl;
    private String instagramUrl;
    private String twitterUrl;
    private String portfolioUrl;
    private String youtubeUrl;
    private String workExperience;
   
    @ElementCollection
    private List<String> skills;
    private int followersCount = 0;
    private int postsCount = 0;
    private int followingCount;
    
    
    
    @Embedded
    private Address address;
    
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resume> resumes;
    
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educations;
  

}
