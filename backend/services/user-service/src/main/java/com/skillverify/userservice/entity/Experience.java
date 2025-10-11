package com.skillverify.userservice.entity;

import jakarta.persistence.Column;
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
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "user")
public class Experience {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String role;
	private String company;
	private String location;
	private String startDate;
	private String endDate;
	private String description;
	@Column(name = "is_current", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	private boolean current = false;
	
	private String duration;

	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private UserData user;
}
