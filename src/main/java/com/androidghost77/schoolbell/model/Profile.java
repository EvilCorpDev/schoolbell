package com.androidghost77.schoolbell.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.data.domain.Persistable;

import lombok.Data;

@Data
@Entity
@Table(name = "profile")
public class Profile implements Persistable<String> {

    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToMany(mappedBy = "profile")
    private List<Schedule> scheduleList;

    @Transient
    private boolean existing = true;

    @Override
    public boolean isNew() {
        return !this.existing;
    }
}
