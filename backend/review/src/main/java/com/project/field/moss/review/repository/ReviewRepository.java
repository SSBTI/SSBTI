package com.project.field.moss.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.field.moss.review.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

}
