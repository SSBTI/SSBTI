package com.project.field.moss.service;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.dto.MbtiDto;
import com.project.field.moss.dto.MbtiInputDto;

import java.util.List;

public interface MbtiService {

    List<MbtiDto> getMbtiAll();

    MbtiDto getMbti(MbtiInputDto types);


}
