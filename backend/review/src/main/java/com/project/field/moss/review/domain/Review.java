package com.project.field.moss.review.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.project.field.moss.review.dto.ReviewInputDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String title;
    
    @Column
    private String author;

    @Column(columnDefinition="TEXT")
    private String content;
    
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    
    @OneToMany(mappedBy="review", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JoinColumn(name="review_id")
	private List<Image> image = new ArrayList<>();

	public void addImage(final Image img) {
		image.add(img);
	}
	
	public void removeImage(final Image img) {
		image.remove(img);
		img.setReview(null);
	}
	
	public void updateReview(ReviewInputDto reviewInputDto) {
		this.title = reviewInputDto.getTitle();
		this.content = reviewInputDto.getContent();
		this.image.clear();
		this.image.addAll(reviewInputDto.getImage());
//		this.image = reviewInputDto.getImage();
	}
}
