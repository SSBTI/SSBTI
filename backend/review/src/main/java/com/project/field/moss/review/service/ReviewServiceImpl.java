package com.project.field.moss.review.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.field.moss.review.domain.Review;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewResultDto;
import com.project.field.moss.review.repository.ImageRepository;
import com.project.field.moss.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
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
		Pageable pageable = PageRequest.of(page-1, 5);
		Page<Review>pages = reviewRepository.findAll(pageable);
	
		List<Review> temp = pages.getContent();
		List<ReviewResultDto> result = new ArrayList<>(); 
		
		for(int i=0; i<temp.size(); ++i) {
			ReviewResultDto dto = new ReviewResultDto();
			dto.setAuthor(temp.get(i).getAuthor());
			dto.setContent(temp.get(i).getContent());
			dto.setTitle(temp.get(i).getTitle());
			
			String[] img = new String[temp.get(i).getImage().size()];
			
			for(int j=0; j<img.length; ++j) {
				img[j] = temp.get(i).getImage().get(j).getFilePath();
			}
			dto.setImg(img);
			
			result.add(dto);
		}
		
		return result;
	}

	@Override
	public ReviewResultDto getReviewById(Long no) {
		Optional<Review> opt = reviewRepository.findById(no);
		
		if(opt.isPresent()) {
			Review review = opt.get();
			ReviewResultDto result = new ReviewResultDto();
			
			result.setAuthor(review.getAuthor());
			result.setContent(review.getContent());
			result.setTitle(review.getTitle());
			
			String[] img = new String[review.getImage().size()];
			
			for(int j=0; j<img.length; ++j) {
				img[j] = review.getImage().get(j).getFilePath();
			}
			result.setImg(img);
			
			return result;
		}else {
			return null;
		}
	}

	@Override
	public boolean deleteReviewById(Long no) {
		reviewRepository.deleteById(no);
		return true;
	}

	@Override
	public ReviewResultDto updateReviewById(Long no, ReviewDto reviewDto) {
		
		return null;
	}

}
