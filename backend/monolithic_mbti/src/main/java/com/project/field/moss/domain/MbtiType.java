package com.project.field.moss.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MbtiType {
    INTJ("INTJ"),
    INTP("INTP"),
    ENTJ("ENTJ"),
    ENTP("ENTP"),
    INFJ("INFJ"),
    INFP("INFP"),
    ENFJ("ENFJ"),
    ENFP("ENFP"),
    ISTJ("ISTJ"),
    ISFJ("ISFJ"),
    ESTJ("ESTJ"),
    ESFJ("ESFJ"),
    ISTP("ISTP"),
    ISFP("ISFP"),
    ESTP("ESTP"),
    ESFP("ESFP");

    private final String typeString;
}
