package com.api.records.services;

import com.api.records.models.PaymentRecordsModel;
import com.api.records.repositories.PaymentRecordsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentRecordService {

    final PaymentRecordsRepository paymentRecordRepository;

    public PaymentRecordService(PaymentRecordsRepository paymentRecordRepository){
        this.paymentRecordRepository = paymentRecordRepository;
    }

    @Transactional
    public Object save(PaymentRecordsModel paymentsRecordModel) {
        return paymentRecordRepository.save(paymentsRecordModel);
    }

    public Page<PaymentRecordsModel> findAll(Pageable pageable) {
        return paymentRecordRepository.findAll(pageable);
    }

    public Optional<PaymentRecordsModel> findById(UUID id) {
        return paymentRecordRepository.findById(id);
    }

    @Transactional
    public void delete(PaymentRecordsModel paymentRecordsModel) {
        paymentRecordRepository.delete(paymentRecordsModel);
    }
}
