package com.skillverify.questionservice.dto;


import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddQuestionDto {
    private String type;
    private String question;
    private String difficulty;
    private String category;
    private List<OptionDto> options = new ArrayList<>();
}