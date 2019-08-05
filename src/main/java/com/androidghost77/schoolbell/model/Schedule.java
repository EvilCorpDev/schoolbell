package com.androidghost77.schoolbell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "time")
    private String time;

    @Column(name = "duration")
    private long duration;

    @Column(name = "audio_path")
    private String audioPath;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;
}
