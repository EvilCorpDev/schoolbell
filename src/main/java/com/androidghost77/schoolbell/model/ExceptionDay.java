package com.androidghost77.schoolbell.model;

import java.io.Serializable;
import java.time.LocalDate;

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
@Table(name = "exception_day")
public class ExceptionDay implements Persistable<String>, Serializable {

    @Id
    private String id;

    @Column(name = "day_of_week")
    private Integer dayOfWeek;

    @Column(name = "specific_day")
    private LocalDate specificDay;

    @ManyToOne
    @JoinColumn(name = "profile_name", referencedColumnName = "name")
    private Profile profile;

    @Transient
    private boolean existing = true;

    @Override
    public boolean isNew() {
        return !this.existing;
    }
}
