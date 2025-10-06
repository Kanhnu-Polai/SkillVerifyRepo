package com.skillverify.userservice.controller;

import com.skillverify.userservice.constant.ErrorCodeEnum;
import com.skillverify.userservice.dto.SocialLinksDto;
import com.skillverify.userservice.dto.UserDataDto;
import com.skillverify.userservice.dto.UserSkillDto;
import com.skillverify.userservice.exception.EmailMissingException;
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
    
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
    	
			log.info("✅ UserDataController: getUserById called with id: {}", id);
    	UserDataDto response =  userDataService.getUserById(id);
    			return ResponseEntity.ok().body(response);
    	
    }
}