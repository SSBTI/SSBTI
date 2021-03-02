package com.project.field.moss.service;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.MbtiType;
import com.project.field.moss.domain.Product;
import com.project.field.moss.domain.RelationshipType;
import com.project.field.moss.domain.connection.Relationship;
import com.project.field.moss.dto.MbtiResultDto;
import com.project.field.moss.dto.MbtiSimpleDto;
import com.project.field.moss.dto.MbtiInputDto;
import com.project.field.moss.repository.MbtiRepository;
import com.project.field.moss.repository.ProductRepository;
import com.project.field.moss.repository.RelationshipRepository;

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
    private final RelationshipRepository relationShipRepository;
    

    @Override
    public List<MbtiResultDto> getMbtiAll() {
        List<MbtiResultDto> list = mbtiRepository.findAll().stream()
                .map(mbti -> { 
                	return MbtiResultDto.builder()
                		.desc(mbti.getDesc())
                		.type(mbti.getType().toString())
                		.name(mbti.getName())
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

        if (types.getSN() > 0) {
            sb.append("S");
        }
        else {
            sb.append("N");
        }

        if (types.getTF() > 0) {
            sb.append("T");
        }
        else {
            sb.append("F");
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
        
        List<Relationship> list = relationShipRepository.findByfrom(mbti);
        List<MbtiSimpleDto> hater = new ArrayList<>(); 
        List<MbtiSimpleDto> lover = new ArrayList<>(); 

        for(int i=0; i<list.size(); ++i) {
        	if(list.get(i).getType()==RelationshipType.HATE) {
        		hater.add(
        				MbtiSimpleDto.builder()
                		.type(list.get(i).getTo().getType().toString())
                		.name(list.get(i).getTo().getName())
                		.build()
        				);
        	}else {
        		lover.add(
        				MbtiSimpleDto.builder()
                		.type(list.get(i).getTo().getType().toString())
                		.name(list.get(i).getTo().getName())
                		.build()
        				);
        	}
        }

        return MbtiResultDto.builder()
        		.desc(mbti.getDesc())
        		.type(mbti.getType().toString())
        		.name(mbti.getName())
        		.haters(hater)
        		.lovers(lover)
        		.products(getRandProduct())
        		.build();
    }
    
    @Override
    public List<Product> getRandProduct() {
		List<Product> list = productRepository.findAll();
		
		Collections.shuffle(list);
		List<Product> result = list.subList(0, 5);
		
		return result;
    }
}
