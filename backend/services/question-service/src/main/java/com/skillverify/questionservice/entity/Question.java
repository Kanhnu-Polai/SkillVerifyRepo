package com.skillverify.questionservice.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "questions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Question {
	
	@Id
	@GeneratedValue
	private UUID questionId;
	
	private String type;
	
	@Column(columnDefinition = "TEXT",nullable = false)
	private String question;
	
	private String difficulty;

    private String category;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt= LocalDateTime.now();
    
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();


}
