package com.project.field.moss.review.service;

import java.util.List;

import com.project.field.moss.review.domain.Review;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewResultDto;

public interface ReviewService {
	void createReview(ReviewDto reviewDto);
	String[] getImageFilePath(String content);
	String[] getAllFilePath(String content);
	String getOnlyContent(String content);
	List<ReviewResultDto> getReviewByPage(int page);
	ReviewResultDto getReviewById(Long no);
	void deleteReviewById(Long no);
	ReviewResultDto updateReviewById(Long no, ReviewDto reviewDto);

}
