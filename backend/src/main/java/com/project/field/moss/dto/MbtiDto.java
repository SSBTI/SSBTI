package com.project.field.moss.dto;

import com.project.field.moss.domain.Mbti;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter @Setter
public class MbtiDto {
    private String type;
    private String desc;
    private List<String> lovers;
    private List<String> haters;


    public MbtiDto(Mbti mbti){
        this.type = mbti.getType().toString();
        this.desc = mbti.getDesc();

    }

}
