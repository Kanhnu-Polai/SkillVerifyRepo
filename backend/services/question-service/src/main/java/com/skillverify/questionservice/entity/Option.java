package com.skillverify.questionservice.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "options")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Option {
	
	@Id
	@GeneratedValue
	private UUID optionId;
	
	
	@Column(columnDefinition = "TEXT",nullable = false)
	private String optionText;
	
	private boolean isCorrect = false;
	@ManyToOne
	@JoinColumn(name = "question_id")
	private Question question;
	

}
