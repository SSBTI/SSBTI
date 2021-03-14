package com.project.field.moss.review.service;

import java.util.List;

import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewResultDto;

public interface ReviewService {
	boolean createReview(ReviewDto reviewDto);
	String[] getImageFilePath(String content);
	String getOnlyContent(String content);
	List<ReviewResultDto> getReviewByPage(int page);

}
