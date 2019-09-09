package com.androidghost77.schoolbell.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.service.ExceptionsService;
import com.androidghost77.schoolbell.service.ProfileScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/exception-days")
@RequiredArgsConstructor
public class ExceptionsController {

    private final ExceptionsService exceptionsService;
    private final ProfileScheduleService profileScheduleService;

    @GetMapping
    public List<ExceptionItemDto> getAllExceptionItems() {
        return exceptionsService.getAllExceptionItems();
    }

    @PostMapping
    public void saveExceptions(@RequestBody List<ExceptionItemDto> itemsToSave) {
        exceptionsService.saveExceptionItems(itemsToSave);
        profileScheduleService.startScheduling(true);
    }

    @DeleteMapping
    public void deleteExceptionItems(@RequestBody List<String> exceptionItemIds) {
        exceptionsService.deleteExceptionItems(exceptionItemIds);
        profileScheduleService.startScheduling(true);
    }
}
