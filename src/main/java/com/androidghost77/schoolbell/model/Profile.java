package com.androidghost77.schoolbell.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "profile_name")
    private String profileName;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToMany(mappedBy = "profile")
    private List<Schedule> scheduleList;
}
