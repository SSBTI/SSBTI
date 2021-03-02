package com.project.field.moss.controller;


import com.project.field.moss.domain.Mbti;
import com.project.field.moss.dto.MbtiDto;
import com.project.field.moss.dto.MbtiInputDto;
import com.project.field.moss.service.MbtiService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mbti")
public class MbtiController {

    private final MbtiService mbtiService;

    @GetMapping("/all")
    public ResponseEntity<List<?>> getAll(){
        List<MbtiDto> result = mbtiService.getMbtiAll();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/result")
    public ResponseEntity<MbtiDto> getMbti(MbtiInputDto input){
        MbtiDto result = mbtiService.getMbti(input);
        return ResponseEntity.ok().body(result);
    }

}
