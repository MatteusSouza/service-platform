package com.api.customerbase.models;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_CUSTOMER_BASE")
public class CustomerBaseModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Column(nullable = false, length = 128)
    private String condominiumName;

    @Column(nullable = false, length = 128)
    private String address;

    @Column(nullable = false, length = 256)
    private String contactEmail;

    @Column(nullable = false, length = 50)
    private String phoneNumber1;

    @Column(length = 50)
    private String phoneNumber2;

    @Column(length = 128)
    private String personContactName;

    @Column(length = 64)
    private String personProfession;

    private BigDecimal monthlyFee;

    @Column(nullable = false)
    private int expirationDay;

    @Column(nullable = false)
    private LocalDateTime registrationDate;

    @Column(nullable = false)
    private boolean activeCustomer;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public boolean isActiveCustomer() {
        return activeCustomer;
    }

    public void setActiveCustomer(boolean activeCustomer) {
        this.activeCustomer = activeCustomer;
    }
}
