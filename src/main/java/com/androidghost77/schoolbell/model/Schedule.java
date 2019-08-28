package com.androidghost77.schoolbell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.data.domain.Persistable;

import lombok.Data;

@Data
@Entity
@Table(name = "schedule")
public class Schedule implements Persistable<String> {

    @Id
    private String id;

    @Column(name = "time")
    private String time;

    @Column(name = "duration")
    private long duration;

    @Column(name = "start_sec")
    private long startSec;

    @Column(name = "audio_path")
    private String audioPath;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Transient
    private boolean existing = true;

    @Override
    public boolean isNew() {
        return !this.existing;
    }
}
