package com.api.customerbase.dtos;

import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.validation.constraints.*;
import java.math.BigDecimal;

public class CustomerBaseDto {

    @NotBlank
    @CNPJ(message = "CNPJ should be valid") //Verificar essa abordagem
    private String cnpj;

    @NotBlank(message = "The Condominium Name cannot be empty")
    private String condominiumName;

    @NotBlank(message = "The address cannot be empty")
    private String address;

    @Email(message = "Email should be valid")
    @NotBlank
    private String contactEmail;

    @Size(min = 8, max = 50, message = "The number must be greater than 8 and less than 50")
    @NotBlank(message = "The phone number is required")
    private String phoneNumber1;

    @Size(min = 8, max = 50, message = "The number must be greater than 8 and less than 50")
    private String phoneNumber2;

    private String personContactName;
    private String personProfession;
    private BigDecimal monthlyFee;

    @Range(min = 0,max = 31)
    private int expirationDay;

    @NotNull(message = "activeCustomer can not be null")
    private boolean activeCustomer = true;

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCondominiumName() {
        return condominiumName;
    }

    public void setCondominiumName(String condominiumName) {
        this.condominiumName = condominiumName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getPhoneNumber1() {
        return phoneNumber1;
    }

    public void setPhoneNumber1(String phoneNumber1) {
        this.phoneNumber1 = phoneNumber1;
    }

    public String getPhoneNumber2() {
        return phoneNumber2;
    }

    public void setPhoneNumber2(String phoneNumber2) {
        this.phoneNumber2 = phoneNumber2;
    }

    public String getPersonContactName() {
        return personContactName;
    }

    public void setPersonContactName(String personContactName) {
        this.personContactName = personContactName;
    }

    public String getPersonProfession() {
        return personProfession;
    }

    public void setPersonProfession(String personProfession) {
        this.personProfession = personProfession;
    }

    public BigDecimal getMonthlyFee() {
        return monthlyFee;
    }

    public void setMonthlyFee(BigDecimal monthlyFee) {
        this.monthlyFee = monthlyFee;
    }

    public int getExpirationDay() {
        return expirationDay;
    }

    public void setExpirationDay(int expirationDay) {
        this.expirationDay = expirationDay;
    }

    public boolean isActiveCustomer() {
        return activeCustomer;
    }

    public void setActiveCustomer(boolean activeCustomer) {
        this.activeCustomer = activeCustomer;
    }
}
