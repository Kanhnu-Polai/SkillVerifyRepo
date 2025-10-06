package com.skillverify.examservice.utils;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillverify.examservice.dto.ExceptionResponse;

import jakarta.servlet.http.HttpServletResponse;

public class ExceptionResponseUtil {

    public static void sendErrorResponse(HttpServletResponse response, String message, String code, String service) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.setContentType("application/json");

        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .message(message)
                .code(code)
                .service(service)
                .build();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(exceptionResponse);
            response.getWriter().write(jsonResponse);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}