package com.project.field.moss.review.domain;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String title;
    
    @Column(columnDefinition="TEXT")
    private String content;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="item_id")
	public Collection<Image> image = new ArrayList<>();

	public void addImage(final Image img) {
		image.add(img);
	}
	
	public void removeImage(final Image img) {
		image.remove(img);
		img.setReview(null);
	}
}
