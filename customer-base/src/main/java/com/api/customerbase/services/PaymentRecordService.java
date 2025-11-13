package com.api.customerbase.services;

import com.api.customerbase.models.PaymentRecordModel;
import com.api.customerbase.repositories.PaymentRecordRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentRecordService {

    final PaymentRecordRepository paymentRecordRepository;

    public PaymentRecordService(PaymentRecordRepository paymentRecordRepository){
        this.paymentRecordRepository = paymentRecordRepository;
    }

    @Transactional
    public Object save(PaymentRecordModel paymentsRecordModel) {
        return paymentRecordRepository.save(paymentsRecordModel);
    }

    public Page<PaymentRecordModel> findAll(Pageable pageable) {
        return paymentRecordRepository.findAll(pageable);
    }

    public Optional<PaymentRecordModel> findById(UUID id) {
        return paymentRecordRepository.findById(id);
    }

    @Transactional
    public void delete(PaymentRecordModel paymentRecordModel) {
        paymentRecordRepository.delete(paymentRecordModel);
    }
}
