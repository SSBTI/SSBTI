package com.project.field.moss.review.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "TEXT")
	private String filePath;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="review_id")
	private Review review;
	
	public Image(Review review, String filePath) {
		this.review = review;
		this.filePath = filePath;
	}

}
