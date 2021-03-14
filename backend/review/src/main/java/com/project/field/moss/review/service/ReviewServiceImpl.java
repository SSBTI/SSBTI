package com.project.field.moss.review.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.project.field.moss.review.domain.Review;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewResultDto;
import com.project.field.moss.review.repository.ImageRepository;
import com.project.field.moss.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

	private final ReviewRepository reviewRepository;
	private final ImageRepository imageRepository;
	private final String splitString = "%!rn!qns!wk!%";
	
	@Override
	public boolean createReview(ReviewDto reviewDto) {
		Review review = new Review();
		
		review.setTitle(reviewDto.getTitle());
		review.setAuthor("관리자");
		
		
		String[] imagePath = getImageFilePath(reviewDto.getContent());
		
		return false;
	}

	@Override
	public String[] getImageFilePath(String content) {
		String[] temp = content.split("!\\[");
		
		ArrayList<String> arr = new ArrayList<>();
		for(int i=0; i<temp.length; ++i) {
			
		}
		return null;
	}

	@Override
	public String getOnlyContent(String content) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReviewResultDto> getReviewByPage(int page) {
		// TODO Auto-generated method stub
		return null;
	}

}
