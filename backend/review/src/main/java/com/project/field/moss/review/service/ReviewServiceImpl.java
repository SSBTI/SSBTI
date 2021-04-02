package com.project.field.moss.review.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.field.moss.review.domain.Image;
import com.project.field.moss.review.domain.Review;
import com.project.field.moss.review.dto.ReviewCountDto;
import com.project.field.moss.review.dto.ReviewDto;
import com.project.field.moss.review.dto.ReviewInputDto;
import com.project.field.moss.review.dto.ReviewResultDto;
import com.project.field.moss.review.repository.ImageRepository;
import com.project.field.moss.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

	private final ReviewRepository reviewRepository;
	private final ImageRepository imageRepository;
	
	private final String splitString = "%!rn!qns!wk!%";
	private final String outerRegexString = "<img(.*?)>"; //<img> 문자열 찾기
	private final String innerRegexString = "src=(.*?)>"; // src="" 문자열 찾기

	
	private final Pattern outerPattern = Pattern.compile(outerRegexString);
	private final Pattern innerPattern = Pattern.compile(innerRegexString);
	
	@Override
	public void createReview(ReviewDto reviewDto) {
		Review review = new Review();
		
		review.setTitle(reviewDto.getTitle());
		review.setAuthor("관리자");

		Date date = java.util.Calendar.getInstance().getTime();
		review.setCreateDate(date);
		System.out.println("야옹잉");
		String[] filePath = getImageFilePath(reviewDto.getContent());
		
		for(int i=0; i<filePath.length; ++i) {
			review.addImage(Image.builder().filePath(filePath[i]).review(review).build());
		}
		
		review.setContent(getOnlyContent(reviewDto.getContent()));
		reviewRepository.save(review);
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
			dto.setNo(temp.get(i).getId());
			dto.setTime(dateFormat.format(temp.get(i).getCreateDate()));
			
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
			result.setNo(review.getId());
			result.setTime(dateFormat.format(review.getCreateDate()));
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
	public void deleteReviewById(Long no) {
		reviewRepository.deleteById(no);
	}

	@Override
	public String[] getImageFilePath(String content) {
		List<String> arr = new ArrayList<>();
		
		Matcher matcher = outerPattern.matcher(content);
		
		while(matcher.find()) {
			String totalFilePath = content.substring(matcher.start(0), matcher.end(0));
			Matcher innerMatcher = innerPattern.matcher(totalFilePath);
			
			if(innerMatcher.find()) {
//				System.out.println();
				arr.add(totalFilePath.substring(innerMatcher.start(0)+5, innerMatcher.end(0)-2));
//				System.out.println(arr.get(arr.size()-1)+"냐옹");
			}
		}
		System.out.println("캬엉");
		System.out.println(arr.toString());
		return arr.toArray(new String[0]);
	}

	@Override
	public String getOnlyContent(String content) {
		String[] allFilePath = getAllFilePath(content);
		for(int i=0; i<allFilePath.length; ++i) {
			content = content.replace(allFilePath[i], splitString);
		}
		
		return content;
	}

	@Override
	public String[] getAllFilePath(String content) {
		List<String> arr = new ArrayList<>();
		
		Matcher matcher = outerPattern.matcher(content);
		
		while(matcher.find()) {
			arr.add(content.substring(matcher.start(0), matcher.end(0)));
		}
		
		return arr.toArray(new String[0]);
	}

	@Override
	public Review updateReviewById(Long no, ReviewInputDto reviewInputDto) {
		final Optional<Review> opt = reviewRepository.findById(no);
		Review review = opt.get();
		review.updateReview(reviewInputDto);
		
		reviewRepository.save(review);
		return review;
	}

	@Override
	public ReviewInputDto getReviewInputDto(ReviewDto reviewDto, Long no) {
		final Optional<Review> opt = reviewRepository.findById(no);
		Review review = opt.get();
	
		ArrayList<Image> arr = new ArrayList<>();
		String[] filePath =getImageFilePath(reviewDto.getContent());
		
		for(int i=0; i<filePath.length; ++i) {
			arr.add(Image.builder().filePath(filePath[i]).review(review).build());
		}
		
		String content = getOnlyContent(reviewDto.getContent());
		
		return new ReviewInputDto(reviewDto.getTitle(), content, arr);
	}

	@Override
	public ReviewCountDto getCountAllReviews() {
		Long result = reviewRepository.count();
		return ReviewCountDto.builder().pageTotal(result).build();
	}

}
