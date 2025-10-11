package com.skillverify.userservice.config;

import com.skillverify.userservice.dto.*;
import com.skillverify.userservice.entity.*;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    private final ModelMapper modelMapper = new ModelMapper();

    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mm = new ModelMapper();

        mm.getConfiguration()
          .setFieldMatchingEnabled(true)
          .setFieldAccessLevel(AccessLevel.PRIVATE)
          .setSkipNullEnabled(true);

        // Fix: avoid duplicate TypeMap creation
        if (mm.getTypeMap(ResumeDto.class, Resume.class) == null) {
            mm.createTypeMap(ResumeDto.class, Resume.class)
              .addMappings(mapper -> {
                  mapper.skip(Resume::setId); // prevent String → Long error
              });
        }

        return mm;
    }
    @PostConstruct
    public void initMappings() {
        // Only add mappings if they don’t already exist
        if (modelMapper.getTypeMap(UserData.class, UserDataDto.class) == null) {
            modelMapper.createTypeMap(UserData.class, UserDataDto.class);
        }

        if (modelMapper.getTypeMap(UserDataDto.class, UserData.class) == null) {
            modelMapper.createTypeMap(UserDataDto.class, UserData.class);
        }

        // Resume Mapping
        if (modelMapper.getTypeMap(ResumeDto.class, Resume.class) == null) {
            modelMapper.createTypeMap(ResumeDto.class, Resume.class);
        }

        if (modelMapper.getTypeMap(Resume.class, ResumeDto.class) == null) {
            modelMapper.createTypeMap(Resume.class, ResumeDto.class);
        }

        // Education Mapping
        if (modelMapper.getTypeMap(EducationDto.class, Education.class) == null) {
            modelMapper.createTypeMap(EducationDto.class, Education.class);
        }
        
        if(modelMapper.getTypeMap(ExperienceDto.class, Experience.class)==null) {
			modelMapper.createTypeMap(ExperienceDto.class, Experience.class);
        }

        if (modelMapper.getTypeMap(Education.class, EducationDto.class) == null) {
            modelMapper.createTypeMap(Education.class, EducationDto.class);
        }

        // Address Mapping
        if (modelMapper.getTypeMap(AddressDto.class, Address.class) == null) {
            modelMapper.createTypeMap(AddressDto.class, Address.class);
        }

        if (modelMapper.getTypeMap(Address.class, AddressDto.class) == null) {
            modelMapper.createTypeMap(Address.class, AddressDto.class);
        }
    }
}