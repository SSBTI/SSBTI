package com.project.field.moss.review.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.field.moss.review.dto.ReviewDto;

@RestController
@RequestMapping("review")
public class ReviewController {
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
	public Object createReview(ReviewDto reviewDto) {
		
		return "postMapping";
	}
	
	@GetMapping("/detail/{no}")
	public Object getAllReviews(@PathVariable("no")int page) {
		return "getMapping";
	}
	
	
}
