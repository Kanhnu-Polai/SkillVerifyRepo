package com.skillverify.userservice.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillverify.userservice.constant.ErrorCodeEnum;
import com.skillverify.userservice.exception.InvalidPublicIdException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {

    private final ResumeService resumeService;
    private final Cloudinary cloudinary;

    public Map<String, String> uploadFile(MultipartFile file, String folder) throws IOException {
        String resourceType = detectResourceType(file);

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folder,
                        "resource_type", resourceType,
                        "access_mode", "public"
                ));

        log.info("Upload result from Cloudinary: {}", uploadResult);

        return Map.of(
                "url", uploadResult.get("secure_url").toString(), // ✅ HTTPS secure URL
                "public_id", uploadResult.get("public_id").toString()
        );
    }

    public ResponseEntity<?> deleteFile(String publicId) {
        log.info("Deleting file with public ID: {}", publicId);

        try {
            Map<?, ?> cloudinaryResp = cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type", "raw",  // ⛏️ Modify if you upload images as "image"
                            "invalidate", true
                    )
            );

            String result = (String) cloudinaryResp.get("result");
            log.info("Cloudinary delete response: {}", cloudinaryResp);

            if (!"ok".equals(result)) {
                log.error("Cloudinary delete failed: {}", result);
                throw new InvalidPublicIdException(ErrorCodeEnum.INVALID_PUBLIC_ID);
            }

            // Remove from DB
            resumeService.deleteResumeByPublicId(publicId);

            return ResponseEntity.ok("File deleted successfully");

        } catch (InvalidPublicIdException ex) {
            throw ex;

        } catch (Exception ex) {
            log.error("Unexpected error while deleting file", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting file: " + ex.getMessage());
        }
    }

    private String detectResourceType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("image/")) {
            return "image";
        } else if ("application/pdf".equals(contentType)) {
            return "raw";
        }
        return "auto"; // fallback
    }
}
