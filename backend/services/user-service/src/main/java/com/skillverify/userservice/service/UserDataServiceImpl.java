package com.skillverify.userservice.service;

import com.skillverify.userservice.HttpServiceEngine;
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

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDataServiceImpl implements UserDataService {

    private final UserDataRepository repository;
    private final ModelMapper mapper;
    private final HttpServiceEngine httpServiceEngine;

    
//---------------------------------------------------------------------------------------------------------------------------------    
    
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
    
    
//---------------------------------------------------------------------------------------------------------------------------------    


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
    
    
//---------------------------------------------------------------------------------------------------------------------------------    


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

    
    
    
  //---------------------------------------------------------------------------------------------------------------------------------    

    
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

    
  //---------------------------------------------------------------------------------------------------------------------------------    

    @Override
    public UserDataDto getUserById(Long id) {
        log.info("✅ UserDataServiceImpl: getUserById called with id: {}", id);
        
       
        UserData user = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));
        return convertToDto(user);
    }

    
  //---------------------------------------------------------------------------------------------------------------------------------    

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
	
	
	//---------------------------------------------------------------------------------------------------------------------------------    


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
	
	
	//---------------------------------------------------------------------------------------------------------------------------------    

	@Override
	public UserDataDto updateUserEmailAndPhone(UpdateEmailPhoneDto updateEmailPhoneDto) {
		log.info("✅ UserDataServiceImpl: updateUserEmailAndPhone called with data: {}", updateEmailPhoneDto);
		 UserData existingUser = repository.findById(updateEmailPhoneDto.getUserId())
				.orElseThrow(()->new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));
		 
		 // now make a call to auth -service validate the password  against existing  email
		String statusCodeString =  httpServiceEngine.updateEmailInAuthService(existingUser.getEmail(), updateEmailPhoneDto.getNewEmail());
		 if(statusCodeString != null && statusCodeString.startsWith("2")) {
			 updateIfNotNull(existingUser::setEmail, updateEmailPhoneDto.getNewEmail());
		 }
		 updateIfNotNull(existingUser::setPhone, updateEmailPhoneDto.getNewPhoneNumber());
		 repository.save(existingUser);
		 log.info("✅ UserDataServiceImpl: Email and Phone updated for user: {}", existingUser.getEmail());
		 UserDataDto userDataDto = convertToDto(existingUser);
		 return userDataDto;
		 
		 
		
	}

	
	
	
	//---------------------------------------------------------------------------------------------------------------------------------    


	@Override
	@Transactional
	public EducationDto updateUserEducation(EducationDto educationDto, Long userId) {
	    log.info("✅ UserDataServiceImpl: updateUserEducation called with data: {}", educationDto);

	    UserData existingUser = repository.findById(userId)
	            .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));

	    // 🟥 CASE 1: Delete Education
	    if (educationDto.isDelete()) {
	        if (educationDto.getId() == null) {
	            throw new IllegalArgumentException("Education ID must be provided for deletion");
	        }

	        boolean removed = existingUser.getEducations()
	                .removeIf(edu -> edu.getId().equals(educationDto.getId()));

	        if (removed) {
	            repository.save(existingUser);
	            log.info("✅ Education with id {} deleted for user: {}", educationDto.getId(), existingUser.getEmail());
	            return null; // or you can return a custom message DTO if desired
	        } else {
	            throw new IllegalArgumentException("❌ Education with id " + educationDto.getId() +
	                    " not found for user " + existingUser.getEmail());
	        }
	    }

	    // 🟨 CASE 2: Update Existing Education
	    if (educationDto.getId() != null) {
	        for (Education edu : existingUser.getEducations()) {
	            if (edu.getId().equals(educationDto.getId())) {
	                updateIfNotNull(edu::setDegree, educationDto.getDegree());
	                updateIfNotNull(edu::setFieldOfStudy, educationDto.getFieldOfStudy());
	                updateIfNotNull(edu::setInstitution, educationDto.getInstitution());
	                updateIfNotNull(edu::setStartYear, educationDto.getStartYear());
	                updateIfNotNull(edu::setEndYear, educationDto.getEndYear());
	                updateIfNotNull(edu::setDescription, educationDto.getDescription());

	                repository.save(existingUser);
	                log.info("✅ Education updated for user: {}", existingUser.getEmail());
	                return mapper.map(edu, EducationDto.class);
	            }
	        }
	        throw new IllegalArgumentException("❌ Education with id " + educationDto.getId() +
	                " not found for user " + existingUser.getEmail());
	    }

	    // 🟩 CASE 3: Add New Education
	    Education newEdu = mapper.map(educationDto, Education.class);
	    newEdu.setUser(existingUser);
	    existingUser.getEducations().add(newEdu);
	    repository.save(existingUser);
	    log.info("✅ New Education added for user: {}", existingUser.getEmail());
	    return mapper.map(newEdu, EducationDto.class);
	}

	
	
	private <T> void updateIfNotNull(Consumer<T> setter, T value) {
	    if (value != null) {
	        setter.accept(value);
	    }
	}

	
	//---------------------------------------------------------------------------------------------------------------------------------    

	@Override
	public ExperienceDto updateUserExperience(ExperienceDto experienceDto, Long userId) {
		log.info("✅ UserDataServiceImpl: updateUserExperience called with data: {}", experienceDto);
		
		 UserData existingUser = repository.findById(userId)
		            .orElseThrow(() -> new UserNotFoundException(ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION));
		 
		 if (experienceDto.isDelete()) {
		        if (experienceDto.getId() == null) {
		            throw new IllegalArgumentException("Experience ID must be provided for deletion");
		        }

		        boolean removed = existingUser.getWorkExperience()
		                .removeIf(exp -> exp.getId().equals(experienceDto.getId()));

		        if (removed) {
		            repository.save(existingUser);
		            log.info("✅ Experience with id {} deleted for user: {}", experienceDto.getId(), existingUser.getEmail());
		            return null; // or you can return a custom message DTO if desired
		        } else {
		            throw new IllegalArgumentException("❌ Experience with id " + experienceDto.getId() +
		                    " not found for user " + existingUser.getEmail());
		        }
		    }

		 String calculatedDuration =calculateDuration(experienceDto.getStartDate(), experienceDto.getEndDate(), experienceDto.isCurrent());
		    // 🟨 CASE 2: Update Existing Experience
		 
		 log.info("Calculated Duration: {}", calculatedDuration);
		    if (experienceDto.getId() != null) {
		        for (Experience exp : existingUser.getWorkExperience()) {
		            if (exp.getId().equals(experienceDto.getId())) {
		                updateIfNotNull(exp::setRole, experienceDto.getRole());
		                updateIfNotNull(exp::setCurrent, experienceDto.isCurrent());
		                updateIfNotNull(exp::setCompany, experienceDto.getCompany());
		                updateIfNotNull(exp::setLocation, experienceDto.getLocation());
		                updateIfNotNull(exp::setStartDate, experienceDto.getStartDate());
		                updateIfNotNull(exp::setEndDate, experienceDto.getEndDate());
		                updateIfNotNull(exp::setDuration, calculatedDuration);
		                updateIfNotNull(exp::setDescription, experienceDto.getDescription());

		                repository.save(existingUser);
		                log.info("✅ Experience updated for user: {}", existingUser.getEmail());
		                return mapper.map(exp, ExperienceDto.class);
		            }
		        }
		        throw new IllegalArgumentException("❌ Experience with id " + experienceDto.getId() +
		                " not found for user " + existingUser.getEmail());
		    }

		    // 🟩 CASE 3: Add New Experience
		    Experience newExp = mapper.map(experienceDto, Experience.class);
		    newExp.setUser(existingUser);
		    newExp.setDuration(calculatedDuration);
		    existingUser.getWorkExperience().add(newExp);
		    repository.save(existingUser);
		    log.info("✅ New Experience added for user: {}", existingUser.getEmail());
		    return mapper.map(newExp, ExperienceDto.class);
		
		
	}
	
	
	
	//---------------------------------------------------------------------------------------------------------------------------------    

	
	private  String calculateDuration(String startDateStr, String endDateStr, boolean isCurrent) {
		log.info("Calculating duration from {} to {}, isCurrent: {}", startDateStr, endDateStr, isCurrent);
        if (startDateStr == null || startDateStr.isEmpty()) return "Invalid start date";

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            LocalDate startDate = LocalDate.parse(startDateStr, formatter);
            LocalDate endDate = (isCurrent || endDateStr == null || endDateStr.isEmpty())
                    ? LocalDate.now()
                    : LocalDate.parse(endDateStr, formatter);

            Period period = Period.between(startDate, endDate);
            int years = period.getYears();
            int months = period.getMonths();

            StringBuilder duration = new StringBuilder();
            if (years > 0) duration.append(years).append(" year").append(years > 1 ? "s " : " ");
            if (months > 0) duration.append(months).append(" month").append(months > 1 ? "s" : "");

            if (duration.length() == 0) duration.append("Less than a month");
            if (isCurrent) duration.append(" (Present)");
            log.info("Calculated duration: {}", duration.toString().trim());

            return duration.toString().trim();
        } catch (Exception e) {
            return "Invalid date format";
        }
    }
	

	//---------------------------------------------------------------------------------------------------------------------------------    

	@Override
	public boolean updateProfileView(Long userId) {
	    return repository.findById(userId)
	        .map(user -> {
	            user.setProfileView(user.getProfileView() + 1);
	            repository.save(user);
	            log.info("Profile view incremented for userId: {}", userId);
	            return true;
	        })
	        .orElseGet(() -> {
	            log.warn("User not found with ID: {}", userId);
	            return false;
	        });
	}

//---------------------------------------------------------------------------------------------------------------------------------    

	@Override
	public boolean updatePostCount(Long userId) {
		return repository.findById(userId)
				.map(user -> {
					user.setPostsCount(user.getPostsCount()+1);
					repository.save(user);
					log.info("Post count incremented for userId : {}",userId);
					return true;
				})
				.orElseGet(()->{
					log.warn("User not found with ID: {}", userId);
		            return false;
				});
	}

	

}













