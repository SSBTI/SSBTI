package com.project.field.moss.review.dto;

import java.util.ArrayList;
import java.util.List;

import com.project.field.moss.review.domain.Image;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReviewInputDto {
	private String title;
	private String content;
	private List<Image> image = new ArrayList<>();

	@Builder
	public ReviewInputDto(String title, String content, ArrayList<Image>image) {
		this.title = title;
		this.content = content;
		this.image = image;
	}
}
