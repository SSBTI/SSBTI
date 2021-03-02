package com.project.field.moss.repository;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.MbtiType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MbtiRepository extends JpaRepository<Mbti, Long> {

    Optional<Mbti> findByType(MbtiType type);
}
