package com.api.records.repositories;

import com.api.records.models.PaymentRecordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRecordRepository extends JpaRepository<PaymentRecordModel, UUID> {
}
