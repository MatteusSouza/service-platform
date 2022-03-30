package com.api.records.controllers;

import com.api.records.dtos.PaymentRecordsDto;
import com.api.records.models.PaymentRecordsModel;
import com.api.records.services.PaymentRecordService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/payment-record")
public class PaymentRecordsController {

    final PaymentRecordService paymentRecordService;

    public PaymentRecordsController(PaymentRecordService paymentRecordService) {
        this.paymentRecordService = paymentRecordService;
    }

    @PostMapping
    public ResponseEntity<Object> savePaymentRecord(@RequestBody @Valid PaymentRecordsDto paymentRecordsDto) {
        var paymentsRecordModel = new PaymentRecordsModel();
        BeanUtils.copyProperties(paymentRecordsDto, paymentsRecordModel);
        paymentsRecordModel.setPaymentDate(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentRecordService.save(paymentsRecordModel));
    }

    @GetMapping
    public ResponseEntity<Page<PaymentRecordsModel>> getAllPaymentRecords(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(paymentRecordService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPaymentRecord(@PathVariable(value = "id") UUID id) {
        Optional<PaymentRecordsModel> paymentRecordModelOptional =paymentRecordService.findById(id);
        if(!paymentRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment Record not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(paymentRecordModelOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePaymentRecord(@PathVariable(value = "id") UUID id) {
        Optional<PaymentRecordsModel> paymentRecordModelOptional = paymentRecordService.findById(id);
        if(!paymentRecordModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment Record not found.");
        }
        paymentRecordService.delete(paymentRecordModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Payment Record deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCustomerBase(@PathVariable(value = "id") UUID id,
                                                     @RequestBody @Valid PaymentRecordsDto paymentRecordsDto) {
        Optional<PaymentRecordsModel> paymentRecordsModelOptional = paymentRecordService.findById(id);
        if(!paymentRecordsModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment Record not found.");
        }
        var paymentRecordsModel = new PaymentRecordsModel();
        BeanUtils.copyProperties(paymentRecordsDto, paymentRecordsModel);
        paymentRecordsModel.setId(paymentRecordsModelOptional.get().getId());
        paymentRecordsModel.setPaymentDate(paymentRecordsModelOptional.get().getPaymentDate());
        return ResponseEntity.status(HttpStatus.OK).body(paymentRecordService.save(paymentRecordsModel));
    }
}
