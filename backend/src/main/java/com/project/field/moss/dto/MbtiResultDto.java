package com.project.field.moss.dto;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter @Setter
@AllArgsConstructor
public class MbtiResultDto {
    private String type;
    private String desc;
    private String name;
    private String img;
    private List<MbtiSimpleDto> lovers;
    private List<MbtiSimpleDto> haters;
    private List<Product> products;

}
