package com.skillverify.userservice.controller;

import com.skillverify.userservice.constant.ErrorCodeEnum;
import com.skillverify.userservice.dto.ResumeDto;
import com.skillverify.userservice.dto.UserDataDto;
import com.skillverify.userservice.exception.EmailMissingException;
import com.skillverify.userservice.exception.EmailVerificationFailed;
import com.skillverify.userservice.exception.EmptyFileException;
import com.skillverify.userservice.service.CloudinaryService;
import com.skillverify.userservice.service.UserDataService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users/upload")
@RequiredArgsConstructor
@Slf4j
public class FileUploadController {

    private final UserDataService userDataService;
    private final CloudinaryService cloudinaryService;

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email) {

        try {
           Map<String, String> result = cloudinaryService.uploadFile(file, "resumes");
            log.info("Resume uploaded to Cloudinary: {}", result.get("url"));
            String url = result.get("url");
            String publicId = result.get("public_id");
            String fileName = file.getOriginalFilename();
            log.info("Resume public ID: {}", publicId);

            UserDataDto existingUser = userDataService.getUserByEmail(email);

            // Create a new Resume DTO
            ResumeDto resumeDto = new ResumeDto();
            resumeDto.setResumeLink(url);
            resumeDto.setResumePublicId(publicId);
            resumeDto.setResumeTitle(fileName); 

            List<ResumeDto> updatedResumes = new ArrayList<>();
            if (existingUser.getResumes() != null) {
                updatedResumes.addAll(existingUser.getResumes());
            }
            updatedResumes.add(resumeDto);
            existingUser.setResumes(updatedResumes);

            UserDataDto updatedUser = userDataService.updateUserData(email, existingUser);
            return ResponseEntity.ok(updatedUser);

        } catch (Exception e) {
            log.error("Resume upload failed: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Resume upload failed: " + e.getMessage());
        }
    }

    @PostMapping("/photo")
    public ResponseEntity<?> uploadPhoto(
            @RequestParam MultipartFile file,
            @RequestParam String email) {

        log.info("✅ Received photo upload request for email: {}", email);

        // Validate file
        if (file.isEmpty()) {
            log.warn("❌ Photo upload failed: File is empty");
            throw new EmptyFileException(ErrorCodeEnum.EMPTY_FILE_EXCEPTION);
        }

        // Validate email
        if (email == null || email.isEmpty()) {
            log.warn("❌ Photo upload failed: Email is null or empty");
            throw new EmailMissingException(ErrorCodeEnum.EMAIL_MISSING_EXCEPTION);
        }

        // Check if user exists
        UserDataDto user = userDataService.getUserByEmail(email);
        if (user == null) {
            log.warn("❌ User not found for email: {}", email);
            throw new EmailVerificationFailed(ErrorCodeEnum.EMAIL_VERIFICATION_FAILED);
        }

        try {
            // Upload to Cloudinary
            Map<String, String> result = cloudinaryService.uploadFile(file, "photos");
            String photoUrl = result.get("url");
            log.info("✅ Photo uploaded successfully: {}", photoUrl);

            // Update user with photo URL
            user.setPhotoUrl(photoUrl);
            UserDataDto updatedUser = userDataService.updateUserData(email, user);

            return ResponseEntity.ok(updatedUser);

        } catch (Exception e) {
            log.error("❌ Photo upload failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Photo upload failed", "details", e.getMessage()));
        }
    }
    @DeleteMapping("/resume/delete")
    public ResponseEntity<?> deleteResume(@RequestParam String publicId) {
		try {
			return cloudinaryService.deleteFile(publicId);
		} catch (Exception e) {
			log.error("Failed to delete resume: {}", e.getMessage(), e);
			return ResponseEntity.internalServerError().body("Failed to delete resume: " + e.getMessage());
		}
	}
}