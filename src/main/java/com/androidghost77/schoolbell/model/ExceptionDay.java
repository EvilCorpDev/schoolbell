package com.androidghost77.schoolbell.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "exception_day")
public class ExceptionDay {

    @Id
    private String id;

    @Column(name = "day_of_week")
    private Integer dayOfWeek;

    @Column(name = "specific_day")
    private LocalDate specificDay;

    @Column(name = "profile_name")
    private String profileName;
}
