package com.project.field.moss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.connection.Relationship;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, Long>{
	List<Relationship> findByfrom(Mbti mbti);
}
