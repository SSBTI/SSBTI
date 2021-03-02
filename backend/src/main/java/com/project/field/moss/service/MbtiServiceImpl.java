package com.project.field.moss.service;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.MbtiType;
import com.project.field.moss.domain.Product;
import com.project.field.moss.dto.MbtiResultDto;
import com.project.field.moss.dto.MbtiInputDto;
import com.project.field.moss.repository.MbtiRepository;
import com.project.field.moss.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MbtiServiceImpl implements MbtiService{

    private final MbtiRepository mbtiRepository;
    private final ProductRepository productRepository;
    

    @Override
    public List<MbtiResultDto> getMbtiAll() {
        List<MbtiResultDto> list = mbtiRepository.findAll().stream()
                .map(mbti -> { 
                	return MbtiResultDto.builder()
                		.desc(mbti.getDesc())
                		.type(mbti.getType().toString())
                		.build();
                })
                .collect(Collectors.toList());
        return list;
    }

    @Override
    public MbtiResultDto getMbti(MbtiInputDto types) {
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
        
        System.out.println(sb);

        Mbti mbti = mbtiRepository.findByType(MbtiType.valueOf(sb.toString())).orElseThrow(
                ()->{throw new IllegalStateException();}
        );

        return MbtiResultDto.builder()
        		.desc(mbti.getDesc())
        		.type(mbti.getType().toString())
//        		.haters()
//        		.lovers()
        		.products(getRandProduct())
        		.build();
    }
    
    @Override
    public List<Product> getRandProduct() {
		List<Product> list = productRepository.findAll();
		
		Collections.shuffle(list);
		List<Product> result = list.subList(0, 1);
		
		return result;
    }
}
