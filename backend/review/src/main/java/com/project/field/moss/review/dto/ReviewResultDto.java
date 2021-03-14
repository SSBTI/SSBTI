package com.project.field.moss.review.dto;

import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @Setter
@NoArgsConstructor
public class ReviewResultDto {
	String title;
	String author = "관리자";
	String[] img;
	String content;

}
