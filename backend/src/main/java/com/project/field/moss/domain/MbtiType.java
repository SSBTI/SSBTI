package com.project.field.moss.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MbtiType {
    INTJ("INTJ"),
//    INTP,
//    ENTJ,
//    ENTP,
//    INFJ,
//    INFP,
//    ENFJ,
//    ENFP,
//    ISTJ,
//    ISFJ,
//    ESTJ,
//    ESFJ,
//    ISTP,
//    ISFP,
//    ESTP,
//    ESFP;

    ENFJ("ENFJ");

    private final String typeString;
}
