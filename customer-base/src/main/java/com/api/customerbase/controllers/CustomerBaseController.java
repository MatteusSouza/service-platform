package com.api.customerbase.controllers;

import com.api.customerbase.dtos.CustomerBaseDto;
import com.api.customerbase.models.CustomerBaseModel;
import com.api.customerbase.services.CustomerBaseService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/customer-base")
public class CustomerBaseController {

    final CustomerBaseService customerBaseService;

    public CustomerBaseController(CustomerBaseService customerBaseService) {
        this.customerBaseService = customerBaseService;
    }

    @PostMapping
    public ResponseEntity<Object> saveCustomerBase(@RequestBody @Valid CustomerBaseDto customerBaseDto) {
        if(customerBaseService.existsByCNPJ(customerBaseDto.getCnpj())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: CNPJ is already in use!");
        }
        if(customerBaseService.existsByContactEmail(customerBaseDto.getContactEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: E-mail is already in use!");
        }

        var customerBaseModel = new CustomerBaseModel();
        customerBaseModel.setExpirationDay(0);
        BeanUtils.copyProperties(customerBaseDto, customerBaseModel);
        customerBaseModel.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(customerBaseService.save(customerBaseModel));
    }

    @GetMapping
    public ResponseEntity<Page<CustomerBaseModel>> getAllCustomerBase(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC)Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(customerBaseService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCustomer(@PathVariable(value = "id") UUID id) {
        Optional<CustomerBaseModel> customerBaseModelOptional = customerBaseService.findById(id);
        if(!customerBaseModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(customerBaseModelOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCustomer(@PathVariable(value = "id") UUID id) {
        Optional<CustomerBaseModel> customerBaseModelOptional = customerBaseService.findById(id);
        if(!customerBaseModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
        }
        customerBaseService.delete(customerBaseModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Customer deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCustomerBase(@PathVariable(value = "id") UUID id,
                                                     @RequestBody @Valid CustomerBaseDto customerBaseDto) {
        Optional<CustomerBaseModel> customerBaseModelOptional = customerBaseService.findById(id);
        if(!customerBaseModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
        }
        var customerBaseModel = new CustomerBaseModel();
        BeanUtils.copyProperties(customerBaseDto, customerBaseModel);
        customerBaseModel.setId(customerBaseModelOptional.get().getId());
        customerBaseModel.setRegistrationDate(customerBaseModelOptional.get().getRegistrationDate());
        return ResponseEntity.status(HttpStatus.OK).body(customerBaseService.save(customerBaseModel));
    }
}
