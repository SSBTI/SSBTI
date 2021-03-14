package com.project.field.moss.review.dto;

import lombok.Setter;

import lombok.Getter;

@Getter @Setter
public class ReviewResultDto {
	String title;
	String author = "관리자";
	String[] filePath;
	String[] content;

}
