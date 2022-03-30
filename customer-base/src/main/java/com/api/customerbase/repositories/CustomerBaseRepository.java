package com.api.customerbase.repositories;

import com.api.customerbase.models.CustomerBaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CustomerBaseRepository extends JpaRepository<CustomerBaseModel, UUID> {

    boolean existsByCnpj(String cnpj);
    boolean existsByContactEmail(String email);

}
