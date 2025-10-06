package com.skillverify.userservice.service;

import com.skillverify.userservice.constant.ErrorCodeEnum;
import com.skillverify.userservice.dto.*;
import com.skillverify.userservice.entity.*;
import com.skillverify.userservice.exception.UserNotFoundException;
import com.skillverify.userservice.repository.UserDataRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDataServiceImpl implements UserDataService {

    private final UserDataRepository repository;
    private final ModelMapper mapper;

    @Override
    @Transactional
    public UserDataDto addUserData(UserDataDto dto) {
        if (dto == null || dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("User data or email cannot be null or empty");
        }

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + dto.getEmail() + " already exists");
        }

        UserData user = convertToEntity(dto);
        UserData savedUser = repository.save(user);
        return convertToDto(savedUser);
    }

    @Override
    @Transactional
    public UserDataDto updateUserData(String email, UserDataDto updateDto) {
        UserData existingUser = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));

        // Update simple fields
        existingUser.setFullName(updateDto.getFullName());
        existingUser.setPhone(updateDto.getPhone());
        existingUser.setBio(updateDto.getBio());
        existingUser.setPhotoUrl(updateDto.getPhotoUrl());
        existingUser.setRole(updateDto.getRole());
        existingUser.setResumeLink(updateDto.getResumeLink());

        // Update Address
        if (updateDto.getAddress() != null) {
            existingUser.setAddress(mapper.map(updateDto.getAddress(), Address.class));
        }

        // Update Education
        if (updateDto.getEducations() != null) {
            List<Education> educations = updateDto.getEducations().stream()
                    .map(e -> {
                        Education edu = mapper.map(e, Education.class);
                        edu.setUser(existingUser);
                        return edu;
                    }).collect(Collectors.toList());

            existingUser.getEducations().clear();
            existingUser.getEducations().addAll(educations);
        }

        // Update Resumes
        if (updateDto.getResumes() != null && !updateDto.getResumes().isEmpty()) {
            List<Resume> resumes = updateDto.getResumes().stream()
                    .map(r -> {
                        Resume res = mapper.map(r, Resume.class);
                        res.setUser(existingUser);
                        return res;
                    }).collect(Collectors.toList());

            existingUser.getResumes().clear();
            existingUser.getResumes().addAll(resumes);
        }

        UserData saved = repository.save(existingUser);
        return convertToDto(saved);
    }

    @Override
    @Transactional
    public void deleteUserData(String email, String password) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        UserData userData = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));

        repository.delete(userData);
    }

    @Override
   @Transactional
    public UserDataDto getUserByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        UserData user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));

        return convertToDto(user);
    }

    // ---------------------- Mapping Helpers ----------------------

    private UserDataDto convertToDto(UserData user) {
        return mapper.map(user, UserDataDto.class);
    }

    private UserData convertToEntity(UserDataDto dto) {
        UserData user = mapper.map(dto, UserData.class);

        if (dto.getEducations() != null) {
            List<Education> educations = dto.getEducations().stream()
                    .map(e -> {
                        Education edu = mapper.map(e, Education.class);
                        edu.setUser(user);
                        return edu;
                    }).collect(Collectors.toList());
            user.setEducations(educations);
        }

        if (dto.getResumes() != null) {
            List<Resume> resumes = dto.getResumes().stream()
                    .map(r -> {
                        Resume res = mapper.map(r, Resume.class);
                        res.setUser(user);
                        return res;
                    }).collect(Collectors.toList());
            user.setResumes(resumes);
        }

        return user;
    }

    @Override
    public UserDataDto getUserById(Long id) {
        log.info("✅ UserDataServiceImpl: getUserById called with id: {}", id);
        UserData user = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));
        return convertToDto(user);
    }

	@Override
	@Transactional
	public SocialLinksDto updateUserSocialLinks(SocialLinksDto socialLinksDto) {
		log.info("✅ UserDataServiceImpl: updateUserSocialLinks called with data: {}", socialLinksDto);
		
		UserData existingUser = repository.findByEmail(socialLinksDto.getEmail())
				.orElseThrow(()->new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));
		
		updateIfNotNull(existingUser::setLinkedinUrl, socialLinksDto.getLinkedinUrl());
		updateIfNotNull(existingUser::setGithubUrl, socialLinksDto.getGithubUrl());
		updateIfNotNull(existingUser::setTwitterUrl, socialLinksDto.getTwitterUrl());
		updateIfNotNull(existingUser::setPortfolioUrl, socialLinksDto.getPortfolioUrl());
		updateIfNotNull(existingUser::setFacebookUrl, socialLinksDto.getFacebookUrl());
		updateIfNotNull(existingUser::setInstagramUrl, socialLinksDto.getInstagramUrl());
		updateIfNotNull(existingUser::setYoutubeUrl, socialLinksDto.getYoutubeUrl());
		repository.save(existingUser);
		log.info("✅ UserDataServiceImpl: Social links updated for user: {}", existingUser.getEmail());
		SocialLinksDto linksDto = SocialLinksDto.builder()
				.email(existingUser.getEmail())
				.linkedinUrl(existingUser.getLinkedinUrl())
				.githubUrl(existingUser.getGithubUrl())
				.twitterUrl(existingUser.getTwitterUrl())
				.portfolioUrl(existingUser.getPortfolioUrl())
				.facebookUrl(existingUser.getFacebookUrl())
				.instagramUrl(existingUser.getInstagramUrl())
				.youtubeUrl(existingUser.getYoutubeUrl())
				.build();
		
		log.info("✅ UserDataServiceImpl: Returning updated SocialLinksDto: {}", linksDto);
		
		
		return linksDto;
	}
	

	@Override
	public UserSkillDto addSkillsToUser(UserSkillDto userSkillDto) {
		log.info("✅ UserDataServiceImpl: addSkillsToUser called with data: {}", userSkillDto);
		UserData existingUser = repository.findByEmail(userSkillDto.getEmail())
				.orElseThrow(()->new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));
		updateIfNotNull(existingUser::setSkills, userSkillDto.getSkills());
		repository.save(existingUser);
		log.info("✅ UserDataServiceImpl: Skills updated for user: {}", existingUser.getEmail());
		UserSkillDto skillDto = UserSkillDto.builder()
				.email(existingUser.getEmail())
				.skills(existingUser.getSkills())
				.build();
		
		
		return skillDto;
	}

	
	
	
	private <T> void updateIfNotNull(Consumer<T> setter, T value) {
	    if (value != null) {
	        setter.accept(value);
	    }
	}

}













