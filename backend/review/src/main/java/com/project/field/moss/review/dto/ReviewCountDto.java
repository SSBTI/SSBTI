package com.project.field.moss.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReviewCountDto {
	Long pageTotal;
	
	@Builder
	public ReviewCountDto(Long pageTotal) {
		this.pageTotal = pageTotal;
	}
}
