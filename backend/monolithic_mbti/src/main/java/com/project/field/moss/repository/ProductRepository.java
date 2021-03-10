package com.project.field.moss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.field.moss.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
//	@Query("SELECT * FROM product ORDER BY random()")
//	List<Product> findByRandom();
	
}
