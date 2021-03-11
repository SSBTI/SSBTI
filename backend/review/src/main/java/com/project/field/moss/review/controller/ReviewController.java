package com.project.field.moss.review.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("review")
public class ReviewController {
	@GetMapping("/{no}")
	public Object getReview(@PathVariable("no")Long no) {
		return "getMapping";
	}
	
	@PatchMapping("/{no}")
	public Object updateReview(@PathVariable("no")Long no) {
		return "patchMapping";
	}
	
	@DeleteMapping("/{no}")
	public Object deleteReview(@PathVariable("no")Long no) {
		return "deleteMapping";
	}
	
	@PostMapping
	public Object createReview() {
		return "postMapping";
	}
	
	@GetMapping("all/{page}")
	public Object getAllReviews(@PathVariable("no")int page) {
		return "5개씩 잘라서 페이지로 보내줌";
	}
	
	
}
