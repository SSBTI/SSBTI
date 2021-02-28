package com.project.field.moss.service;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.MbtiType;
import com.project.field.moss.dto.MbtiDto;
import com.project.field.moss.dto.MbtiInputDto;
import com.project.field.moss.repository.MbtiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MbtiServiceImpl implements MbtiService{

    private final MbtiRepository mbtiRepository;

    @Override
    public List<MbtiDto> getMbtiAll() {
        List<MbtiDto> list = mbtiRepository.findAll().stream()
                .map(mbti -> { return new MbtiDto(mbti);})
                .collect(Collectors.toList());
        return list;
    }

    @Override
    public MbtiDto getMbti(MbtiInputDto types) {
        StringBuilder sb = new StringBuilder();
        if (types.getIE() > 0) {
            sb.append("I");
        }
        else {
            sb.append("E");
        }

        if (types.getNS() > 0) {
            sb.append("N");
        }
        else {
            sb.append("S");
        }

        if (types.getFT() > 0) {
            sb.append("F");
        }
        else {
            sb.append("T");
        }

        if (types.getJP() > 0) {
            sb.append("J");
        }
        else {
            sb.append("P");
        }

        Mbti mbti = mbtiRepository.findByType(MbtiType.valueOf(sb.toString())).orElseThrow(
                ()->{throw new IllegalStateException();}
        );

        return new MbtiDto(mbti);
    }
}
