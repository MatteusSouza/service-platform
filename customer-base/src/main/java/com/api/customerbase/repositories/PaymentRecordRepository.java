package com.api.customerbase.repositories;

import com.api.customerbase.models.PaymentRecordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRecordRepository extends JpaRepository<PaymentRecordModel, UUID> {
}
