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
    private List<String> lovers;
    private List<String> haters;
    private List<Product> products;

}
