package com.api.customerbase.services;

import com.api.customerbase.models.AssistanceRecordModel;
import com.api.customerbase.repositories.AssistanceRecordRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class AssistanceRecordService {

    final AssistanceRecordRepository assistanceRecordRepository;

    public AssistanceRecordService(AssistanceRecordRepository assistanceRecordRepository) {
        this.assistanceRecordRepository = assistanceRecordRepository;
    }

    @Transactional
    public Object save(AssistanceRecordModel assistanceRecordModel) {
        return assistanceRecordRepository.save(assistanceRecordModel);
    }

    public Page<AssistanceRecordModel> findAll(Pageable pageable) {
        return assistanceRecordRepository.findAll(pageable);
    }

    public Optional<AssistanceRecordModel> findById(UUID id) {
        return assistanceRecordRepository.findById(id);
    }

    @Transactional
    public void delete(AssistanceRecordModel assistanceRecordModel) {
        assistanceRecordRepository.delete(assistanceRecordModel);
    }
}
