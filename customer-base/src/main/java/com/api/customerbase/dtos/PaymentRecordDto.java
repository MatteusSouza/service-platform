package com.api.customerbase.dtos;

import org.hibernate.validator.constraints.br.CNPJ;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public class PaymentRecordDto {

    private UUID customerKey; //UUID.fromString("29089735-9169-40fd-815a-2c90a0f84051")

    @NotBlank(message = "CNPJ cannot be empty")
    @CNPJ(message = "CNPJ should be valid")
    private String customerCnpj;

    @NotBlank(message = "Customer Name cannot be empty")
    private String customerName;

    @DateTimeFormat
    @NotNull(message = "Due Date cannot be empty")
    private LocalDate dueDate; //Example: //LocalDate agora = LocalDate.now();  //LocalDate.of(2021,2,15);

    @NotNull
    private BigDecimal amountCharged;

    @NotNull
    private BigDecimal paymentAmount;


    public UUID getCustomerKey() {
        return customerKey;
    }

    public void setCustomerKey(String customerKey) {
        this.customerKey = UUID.fromString(customerKey);
    }

    public String getCustomerCnpj() {
        return customerCnpj;
    }

    public void setCustomerCnpj(String customerCnpj) {
        this.customerCnpj = customerCnpj;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getAmountCharged() {
        return amountCharged;
    }

    public void setAmountCharged(BigDecimal amountCharged) {
        this.amountCharged = amountCharged;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }
}
