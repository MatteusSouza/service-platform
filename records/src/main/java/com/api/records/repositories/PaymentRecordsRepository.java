package com.api.records.repositories;

import com.api.records.models.PaymentRecordsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRecordsRepository extends JpaRepository<PaymentRecordsModel, UUID> {
}
