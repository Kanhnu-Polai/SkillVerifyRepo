package com.skillverify.userservice.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {
	
	@Id
	@GeneratedValue
	private UUID id;
	
	private String resumeLink;
	private String resumeTitle;
private String resumePublicId;

	
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserData user;
	

}
