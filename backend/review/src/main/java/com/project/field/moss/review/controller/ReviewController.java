package com.project.field.moss.review.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.field.moss.review.domain.Review;
import com.project.field.moss.review.dto.Response;
import com.project.field.moss.review.dto.ReviewCountDto;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewInputDto;
import com.project.field.moss.review.dto.ReviewResultDto;
import com.project.field.moss.review.service.ReviewService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("review")
@RequiredArgsConstructor
public class ReviewController {
	private final ReviewService reviewService;
	
	@GetMapping("/{page}")
	public ResponseEntity<List<?>> getReview(@PathVariable("page")int page) {
		List<ReviewResultDto> result = reviewService.getReviewByPage(page); 
		return ResponseEntity.ok().body(result);
	}
	
	@PutMapping("/detail/{no}")
	public ResponseEntity updateReview(@PathVariable("no")Long no, ReviewDto reviewDto) {
		ReviewInputDto dto = reviewService.getReviewInputDto(reviewDto, no);
		Review review = reviewService.updateReviewById(no, dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/detail/{no}")
	public ResponseEntity deleteReview(@PathVariable("no")Long no) {
		reviewService.deleteReviewById(no);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Response> createReview(ReviewDto reviewDto) {
		reviewService.createReview(reviewDto);
		return ResponseEntity.ok().body(new Response("데이터 저장했습니다링"));
	}
	
	@GetMapping("/detail/{no}")
	public ResponseEntity<ReviewResultDto> getAllReviews(@PathVariable("no")Long no) {
		ReviewResultDto result = reviewService.getReviewById(no);
		
		if(result==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/page")
	public ResponseEntity<ReviewCountDto> getCountAllReviews(){
		ReviewCountDto result = reviewService.getCountAllReviews();
		
		return ResponseEntity.ok().body(result);
	}
	
}
