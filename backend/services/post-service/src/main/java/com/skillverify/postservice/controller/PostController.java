package com.skillverify.postservice.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.skillverify.postservice.dto.PostCreationDto;
import com.skillverify.postservice.dto.UpdateLIkeDto;
import com.skillverify.postservice.entity.Post;
import com.skillverify.postservice.service.CloudinaryService;
import com.skillverify.postservice.service.PostService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

	private final PostService postService;
	private final CloudinaryService cloudinaryService;

	@PostMapping(value = "/create-post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Post> createPost(@Valid @RequestPart(value = "post") PostCreationDto postCreationDto,
			@RequestPart(value = "image", required = false) MultipartFile image) {
		log.info("✅ PostController ----> createPost() endpoint called with data {}", postCreationDto);

		if (image != null && !image.isEmpty()) {

			log.info("✅ Image file received: {}", image.getOriginalFilename());
			// Call the Cloudinary service to upload the image and get the URL
			Map<String, String> responseMap = cloudinaryService.uploadFile(image, "posts");
			log.info("✅ Image uploaded to Cloudinary with URL: {}", responseMap.get("url"));
			postCreationDto.setImageUrl(responseMap.get("url"));
		} else {
			log.info("⚠️ No image file provided in the request.");

		}

		Post post = postService.createPost(postCreationDto);

		return ResponseEntity.status(HttpStatus.CREATED).body(post);
	}
	
	
	@GetMapping("/trending")
	public ResponseEntity<List<Post>> getTrendingPosts() {
		log.info("✅ PostController ----> getTrendingPosts() endpoint called");
		List<Post> trendingPosts = postService.getTrendingPosts();
		return ResponseEntity.status(HttpStatus.OK).body(trendingPosts);
	}
	
	
	@PutMapping("/update-post-likes")
	public ResponseEntity<Post>  updatePostLikes(@RequestBody UpdateLIkeDto updateLIkeDto) {
		log.info("✅ PostController ----> updatePostLikes() endpoint called with data {}", updateLIkeDto);
	ResponseEntity<Post> responseEntity = 	postService.updateLikeCount(updateLIkeDto.getPostId(),updateLIkeDto.getIsLiked());
		return  responseEntity;
	}
	
	@PutMapping("/update-post-comments")
	public ResponseEntity<Post> updatePostComments(@RequestParam UUID postId) {
		log.info("✅ PostController ----> updatePostComments() endpoint called with Post ID: {}", postId);
		Post responseEntity = postService.updateCommentCount(postId);
		return ResponseEntity.status(HttpStatus.OK).body(responseEntity);
	}
	
	@GetMapping("/user-posts")
	public ResponseEntity<List<Post>> getPostDetailsForSPecificUser(@RequestParam Long userId) {
		log.info("✅ PostController ----> getPostDetailsForSPecificUser() endpoint called with User ID: {}", userId);
		
		List<Post> posts = postService.getCurrentUserPosts(userId);
		return ResponseEntity.status(HttpStatus.OK).body(posts);
	}

}
