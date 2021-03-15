package com.moss.admin.commons;

import lombok.*;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private final String message;
    private final String code;
}
