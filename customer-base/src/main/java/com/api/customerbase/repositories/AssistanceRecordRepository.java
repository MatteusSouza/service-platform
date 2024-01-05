package com.api.customerbase.repositories;

import com.api.customerbase.models.AssistanceRecordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssistanceRecordRepository extends JpaRepository<AssistanceRecordModel, UUID> {
}
