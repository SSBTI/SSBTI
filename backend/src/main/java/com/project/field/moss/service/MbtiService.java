package com.project.field.moss.service;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.Product;
import com.project.field.moss.dto.MbtiResultDto;
import com.project.field.moss.dto.MbtiInputDto;

import java.util.List;

public interface MbtiService {

    List<MbtiResultDto> getMbtiAll();

    MbtiResultDto getMbti(MbtiInputDto types);
    List<Product> getRandProduct();


}
