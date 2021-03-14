package com.project.field.moss.review.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.field.moss.review.dto.Response;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.service.ReviewService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("review")
@RequiredArgsConstructor
public class ReviewController {
	private final ReviewService reviewService;
	
	@GetMapping("/{page}")
	public Object getReview(@PathVariable("page")Long no) {
		return "5개씩 잘라서 페이지로 보내줌";
	}
	
	@PatchMapping("/detail/{no}")
	public Object updateReview(@PathVariable("no")Long no) {
		return "patchMapping";
	}
	
	@DeleteMapping("/detail/{no}")
	public Object deleteReview(@PathVariable("no")Long no) {
		return "deleteMapping";
	}
	
	@PostMapping
	public ResponseEntity<Response> createReview(ReviewDto reviewDto) {
		
		return ResponseEntity.ok().body(new Response("데이터 저장했습니다링"));
	}
	
	@GetMapping("/detail/{no}")
	public Object getAllReviews(@PathVariable("no")int page) {
		return "getMapping";
	}
	
	
}
