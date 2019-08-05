package com.androidghost77.schoolbell.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "exception_day")
public class ExceptionDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "day_of_week")
    private int dayOfWeek;

    @Column(name = "is_repeatable")
    private boolean isRepeatable;

    @Column(name = "specific_day")
    private LocalDate specificDay;
}
