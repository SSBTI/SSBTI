package com.project.field.moss.review.service;

import java.util.List;

import com.project.field.moss.review.domain.Review;
import com.project.field.moss.review.dto.ReviewCountDto;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewInputDto;
import com.project.field.moss.review.dto.ReviewResultDto;

public interface ReviewService {
	void createReview(ReviewDto reviewDto);
	String[] getImageFilePath(String content);
	String[] getAllFilePath(String content);
	String getOnlyContent(String content);
	List<ReviewResultDto> getReviewByPage(int page);
	ReviewResultDto getReviewById(Long no);
	void deleteReviewById(Long no);
	Review updateReviewById(Long no, ReviewInputDto reviewInputDto);
	ReviewInputDto getReviewInputDto(ReviewDto reviewDto, Long no);
	ReviewCountDto getCountAllReviews();

}
