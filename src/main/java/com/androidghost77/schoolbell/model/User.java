package com.androidghost77.schoolbell.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.data.domain.Persistable;

import com.androidghost77.schoolbell.enums.UserRole;

import lombok.Data;

@Data
@Entity
public class User implements Persistable<String>, Serializable {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;

    private UserRole role;

    @Transient
    private boolean existing = true;

    @Override
    public boolean isNew() {
        return !this.existing;
    }
}
