package com.skillverify.postservice.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.skillverify.postservice.contant.ErrorCodeEnum;
import com.skillverify.postservice.exception.ImageFileUploadException;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {
	
    private final Cloudinary cloudinary;

    // Name must match your config: cloudinaryCB / cloudinaryRetry
    @CircuitBreaker(name = "cloudinaryCB", fallbackMethod = "uploadFileFallback")
    @Retry(name = "cloudinaryRetry")
    public Map<String, String> uploadFile(MultipartFile file, String folder) {
        log.info("✅ Uploading file to Cloudinary in folder: {}", folder);
        String resourceType = detectResourceType(file);

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    com.cloudinary.utils.ObjectUtils.asMap(
                            "folder", folder,
                            "resource_type", resourceType,
                            "access_mode", "public"
                    ));

            log.info("Upload result from Cloudinary: {}", uploadResult);

            return Map.of(
                    "url", uploadResult.get("secure_url").toString(), // ✅ HTTPS secure URL
                    "public_id", uploadResult.get("public_id").toString()
            );
        } catch (Exception e) {
            log.error("❌ Error uploading file to Cloudinary", e);
            throw new ImageFileUploadException(ErrorCodeEnum.IMAGE_FILE_UPLOAD_ERROR);
        }
    }

    // --- CircuitBreaker Fallback ---
    public Map<String, String> uploadFileFallback(MultipartFile file, String folder, Throwable t) {
        log.error("⚠️ CircuitBreaker Fallback triggered for Cloudinary upload. Reason: {}", t.getMessage());
        throw new ImageFileUploadException(ErrorCodeEnum.IMAGE_FILE_UPLOAD_ERROR);
    }

    private String detectResourceType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null) {
            if (contentType.startsWith("image/")) {
                return "image";
            } else if (contentType.startsWith("video/")) {
                return "video";
            } else if (contentType.equals("application/pdf") ||
                       contentType.equals("application/msword") ||
                       contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                return "raw"; // For documents like PDF, DOC, DOCX
            } else {
                return "raw"; // Default to raw for other file types
            }
        }
        return "auto";
    }
}
