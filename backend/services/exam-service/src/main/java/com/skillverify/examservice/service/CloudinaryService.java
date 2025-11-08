package com.skillverify.examservice.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {

    
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
