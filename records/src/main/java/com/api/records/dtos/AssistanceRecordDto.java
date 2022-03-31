package com.api.records.dtos;

import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public class AssistanceRecordDto {

    private UUID customerKey;

    @NotBlank(message = "Assistance Type cannot be empty")
    private String assistanceType;

    @NotBlank(message = "Assistance Description cannot be empty")
    private String assistanceDescription;

    @NotBlank(message = "Customer Name cannot be empty")
    private String customerName;

    @CNPJ(message = "CNPJ should be valid")
    private String customerCnpj;

    private String address;
    private String personsName;
    private String technicianName;

    @NotNull @Range(min = 0, max = 2)
    private int priority = 1;

    @NotNull
    private BigDecimal amountCharged = BigDecimal.valueOf(0.00);

    public UUID getCustomerKey() {
        return customerKey;
    }

    public void setCustomerKey(UUID customerKey) {
        this.customerKey = customerKey;
    }

    public String getAssistanceType() {
        return assistanceType;
    }

    public void setAssistanceType(String assistanceType) {
        this.assistanceType = assistanceType;
    }

    public String getAssistanceDescription() {
        return assistanceDescription;
    }

    public void setAssistanceDescription(String assistanceDescription) {
        this.assistanceDescription = assistanceDescription;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCnpj() {
        return customerCnpj;
    }

    public void setCustomerCnpj(String customerCnpj) {
        this.customerCnpj = customerCnpj;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPersonsName() {
        return personsName;
    }

    public void setPersonsName(String personsName) {
        this.personsName = personsName;
    }

    public String getTechnicianName() {
        return technicianName;
    }

    public void setTechnicianName(String technicianName) {
        this.technicianName = technicianName;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public BigDecimal getAmountCharged() {
        return amountCharged;
    }

    public void setAmountCharged(BigDecimal amountCharged) {
        this.amountCharged = amountCharged;
    }

}
