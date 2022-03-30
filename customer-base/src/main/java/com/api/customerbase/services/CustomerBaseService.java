package com.api.customerbase.services;

import com.api.customerbase.models.CustomerBaseModel;
import com.api.customerbase.repositories.CustomerBaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerBaseService {

    final
    CustomerBaseRepository customerBaseRepository;

    public CustomerBaseService(CustomerBaseRepository customerBaseRepository) {
        this.customerBaseRepository = customerBaseRepository;
    }

    @Transactional
    public Object save(CustomerBaseModel customerBaseModel) {
        return customerBaseRepository.save(customerBaseModel);
    }

    public boolean existsByCNPJ(String cnpj) {
        return customerBaseRepository.existsByCnpj(cnpj);
    }

    public boolean existsByContactEmail(String contactEmail) {
        return customerBaseRepository.existsByContactEmail(contactEmail);
    }

    public Page<CustomerBaseModel> findAll(Pageable pageable) {
        return customerBaseRepository.findAll(pageable);
    }

    public Optional<CustomerBaseModel> findById(UUID id) {
        return customerBaseRepository.findById(id);
    }

    @Transactional
    public void delete(CustomerBaseModel customerBaseModel) {
        customerBaseRepository.delete(customerBaseModel);
    }
}
