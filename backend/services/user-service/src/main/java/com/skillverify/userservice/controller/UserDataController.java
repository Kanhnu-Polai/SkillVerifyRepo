package com.skillverify.userservice.controller;

import com.skillverify.userservice.constant.ErrorCodeEnum;
import com.skillverify.userservice.dto.EducationDto;
import com.skillverify.userservice.dto.ExperienceDto;
import com.skillverify.userservice.dto.SocialLinksDto;
import com.skillverify.userservice.dto.UpdateEmailPhoneDto;
import com.skillverify.userservice.dto.UserDataDto;
import com.skillverify.userservice.dto.UserSkillDto;
import com.skillverify.userservice.exception.EmailMissingException;
import com.skillverify.userservice.exception.UserIdNotProvidedException;
import com.skillverify.userservice.service.UserDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/users")
@Slf4j
@RequiredArgsConstructor
public class UserDataController {

    private final UserDataService userDataService;
    private final String className = this.getClass().getSimpleName();
    

    @PostMapping("/create")
    public ResponseEntity<UserDataDto> createUser(
            @Valid @RequestBody UserDataDto userDataDto) {
        
        String method = "createUser";
        log.info("{} || {} : Request to create user: {}", className, method, userDataDto.getEmail());

        UserDataDto createdUser = userDataService.addUserData(userDataDto);

        log.info("{} || {} : User created successfully: {}", className, method, createdUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    
    
 
    
    @PutMapping("/social-links/update")
    public ResponseEntity<SocialLinksDto> upadteUserSociaLinks(  @RequestBody SocialLinksDto socialLinksDto ){
    	log.info("✅ UserDataController: upadteUserSociaLinks called with data: {}", socialLinksDto);
    	
    	if(socialLinksDto.getEmail() == null || socialLinksDto.getEmail().isEmpty()) {
			throw new EmailMissingException(ErrorCodeEnum.EMAIL_MISSING_EXCEPTION);
		}
    	
     SocialLinksDto linksDto = 	userDataService.updateUserSocialLinks(socialLinksDto);
    	return ResponseEntity.ok().body(linksDto);
    }
    
    
    

    
    @PutMapping("/update/phone-or-email")
    public ResponseEntity<UserDataDto> updatePhoneOrEmail(@RequestBody UpdateEmailPhoneDto updateEmailPasswordDto) {
    	log.info("✅ UserDataController: updatePhoneOrEmail called for userId: {}", updateEmailPasswordDto.getUserId());
    	
    		 UserDataDto userDataDto = 	userDataService.updateUserEmailAndPhone(updateEmailPasswordDto);
    	
    	
    	return ResponseEntity.ok().body(userDataDto);
    }

    
    

   
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDataDto> getUserByEmail(@PathVariable String email) {
        String method = "getUserByEmail";
        log.info("{} || {} : Fetching user by email: {}", className, method, email);

        UserDataDto userData = userDataService.getUserByEmail(email);

        log.info("{} || {} : User fetched: {}", className, method, userData.getEmail());
        return ResponseEntity.ok(userData);
    }

    

    
    @PutMapping("/update/{email}")
    public ResponseEntity<UserDataDto> updateUser( @PathVariable String email, @Valid @RequestBody UserDataDto updateData) {
     log.info("✅ UserDataController: updateUser called with email: {}", email);
        String method = "updateUser";
        log.info("{} || {} : Updating user with email: {}", className, method, email);

        UserDataDto updatedUser = userDataService.updateUserData(email, updateData);

        log.info("{} || {} : User updated: {}", className, method, updatedUser.getEmail());
        return ResponseEntity.ok(updatedUser);
    }
    
    

    @PutMapping("/skills/add")
    public ResponseEntity<UserSkillDto> addSkillsToUser(@RequestBody UserSkillDto userSkillDto ){ 
    	log.info("✅ UserDataController: addSkillsToUser called with data: {}", userSkillDto);
    	
		if(userSkillDto.getEmail() == null || userSkillDto.getEmail().isEmpty()) {
			throw new EmailMissingException(ErrorCodeEnum.EMAIL_MISSING_EXCEPTION);
		}
	  UserSkillDto userSkillsDto = 	userDataService.addSkillsToUser(userSkillDto); 
	  return ResponseEntity.ok().body(userSkillsDto);
	}
	
    

	@DeleteMapping("/delete/{email}/{password}")
	public ResponseEntity<String> deleteUser( @PathVariable String email, @PathVariable String password) {
		String method = "deleteUser";
		log.info("{} || {} : Deleting user with email: {}", className, method, email);

		userDataService.deleteUserData(email, password);

		log.info("{} || {} : User deleted: {}", className, method, email);
		return ResponseEntity.ok("User deleted successfully");

	}
	
	
	

	
	@PutMapping("/update/education/{userId}")
	public ResponseEntity<EducationDto> updateEducation( @PathVariable Long userId , @RequestBody EducationDto educationDto){
		log.info("✅ UserDataController: updateEducation called for userId: {}", userId);
		if(userId == null) {
			throw new UserIdNotProvidedException(ErrorCodeEnum.USER_ID_NOT_PROVIDED_EXCEPTION);
		}
		EducationDto eduDto = userDataService.updateUserEducation(educationDto, userId);
		return ResponseEntity.ok(eduDto);
	}
	
	
	

	
	@PutMapping("/update/experience/{userId}")
	public ResponseEntity<ExperienceDto> updateExeperience( @PathVariable Long userId , @RequestBody ExperienceDto experienceDto){
		log.info("✅ UserDataController: updateExeperience called for userId: {}", userId);
		if(userId == null) {
			throw new UserIdNotProvidedException(ErrorCodeEnum.USER_ID_NOT_PROVIDED_EXCEPTION);
		}
		ExperienceDto experience = userDataService.updateUserExperience(experienceDto, userId);
		
		return ResponseEntity.ok(experienceDto);}
	
	
	

    
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
    	
			log.info("✅ UserDataController: getUserById called with id: {}", id);
    	UserDataDto response =  userDataService.getUserById(id);
    			return ResponseEntity.ok().body(response);
    	
    }
    
    

    @PostMapping("/update-profile-view")
    public ResponseEntity<String> updateProfileViewCount(@RequestParam Long userId) {
        log.info("Received request to update profile view count for userId: {}", userId);

        boolean updated = userDataService.updateProfileView(userId);

        if (updated) {
            return ResponseEntity.ok("Profile view count updated successfully for userId: " + userId);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found for userId: " + userId);
        }
    }
    
    

    @PostMapping("/update-post-count")
    public ResponseEntity<String> updatePostCount(@RequestParam Long userId){
    	log.info("Recived a request to update post count for userId : {}",userId);
    	boolean updated = userDataService.updatePostCount(userId);
    	if (updated) {
            return ResponseEntity.ok("Post count updated successfully for userId: " + userId);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found for userId: " + userId);
        }
    }
    
}