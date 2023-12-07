package com.doanbenhvien.DoAnBenhVien.Utils;

import org.springframework.stereotype.Component;

@Component
public class ErrorHandler {
    public String getMessageError(String error) {
        int idxStart = error.indexOf('[');
        int idxEnd = error.indexOf(']');
        return error.substring(idxStart, idxEnd + 1);
    }
}
