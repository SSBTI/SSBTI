package com.project.field.moss.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum RelationshipType {
    HATE("HATE"), 
    LOVE("LOVE");
	
    private final String typeString;
}
