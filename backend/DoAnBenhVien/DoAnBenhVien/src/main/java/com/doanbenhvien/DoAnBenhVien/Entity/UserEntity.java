package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserEntity {
    @Id
    private String phone;
    private String username;
}
