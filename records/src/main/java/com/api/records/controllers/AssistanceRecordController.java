package com.api.records.controllers;

import com.api.records.dtos.AssistanceRecordDto;
import com.api.records.models.AssistanceRecordModel;
import com.api.records.services.AssistanceRecordService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/assistance-record")
public class AssistanceRecordController {

    final AssistanceRecordService assistanceRecordService;

    public AssistanceRecordController(AssistanceRecordService assistanceRecordService) {
        this.assistanceRecordService = assistanceRecordService;
    }

    @PostMapping
    public ResponseEntity<Object> saveAssistanceRecord(@RequestBody @Valid AssistanceRecordDto assistanceRecordDto) {
        var assistanceRecordModel = new AssistanceRecordModel();
        BeanUtils.copyProperties(assistanceRecordDto, assistanceRecordModel);
        assistanceRecordModel.setOpeningDate(LocalDateTime.now(ZoneId.of("UTC")));
        assistanceRecordModel.setOrderOpen(true);
        return ResponseEntity.status(HttpStatus.CREATED).body(assistanceRecordService.save(assistanceRecordModel));
    }

    @GetMapping
    public ResponseEntity<Page<AssistanceRecordModel>> getAllAssistanceRecords(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(assistanceRecordService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getAssistanceRecord(@PathVariable(value = "id") UUID id) {
        Optional<AssistanceRecordModel> assistanceRecordModelOptional = assistanceRecordService.findById(id);
        if(!assistanceRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assistance Record not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(assistanceRecordModelOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAssistanceRecord(@PathVariable(value = "id") UUID id) {
        Optional<AssistanceRecordModel> assistanceRecordModelOptional = assistanceRecordService.findById(id);
        if(!assistanceRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assistance Record not found.");
        }
        assistanceRecordService.delete(assistanceRecordModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Customer deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAssistanceRecord(@PathVariable(value = "id") UUID id,
                                                     @RequestBody @Valid AssistanceRecordDto assistanceRecordDto) {
        Optional<AssistanceRecordModel> assistanceRecordModelOptional = assistanceRecordService.findById(id);
        if(!assistanceRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assistance Record not found.");
        }
        var assistanceRecordModel = new AssistanceRecordModel();
        BeanUtils.copyProperties(assistanceRecordDto, assistanceRecordModel);
        assistanceRecordModel.setOrderOpen(assistanceRecordModelOptional.get().isOrderOpen());
        assistanceRecordModel.setId(assistanceRecordModelOptional.get().getId());
        assistanceRecordModel.setOpeningDate(assistanceRecordModelOptional.get().getOpeningDate());
        return ResponseEntity.status(HttpStatus.OK).body(assistanceRecordService.save(assistanceRecordModel));
    }

    @PutMapping("/c/{id}")
    public ResponseEntity closeAssistanceRecord(@PathVariable(value = "id") UUID id) {
        Optional<AssistanceRecordModel> assistanceRecordModelOptional = assistanceRecordService.findById(id);
        if(!assistanceRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assistance Record not found.");
        }
        if( !assistanceRecordModelOptional.get().isOrderOpen() ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This assistance record has already been closed");
        }
        assistanceRecordModelOptional.get().setOrderOpen(false);
        assistanceRecordModelOptional.get().setClosingDate(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.OK).body( assistanceRecordService.save(assistanceRecordModelOptional.get() ));
    }

    @PutMapping("/o/{id}")
    public ResponseEntity reopenAssistanceRecord(@PathVariable(value = "id") UUID id) {
        Optional<AssistanceRecordModel> assistanceRecordModelOptional = assistanceRecordService.findById(id);
        if(!assistanceRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assistance Record not found.");
        }
        if( assistanceRecordModelOptional.get().isOrderOpen() ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This assistance record has already been opened");
        }
        assistanceRecordModelOptional.get().setOrderOpen(true);
        assistanceRecordModelOptional.get().setClosingDate(null);
        return ResponseEntity.status(HttpStatus.OK).body( assistanceRecordService.save(assistanceRecordModelOptional.get() ));
    }

}
