package com.api.records.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_ASSISTANCE_RECORDS")
public class AssistanceRecordModel {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column
    private UUID customerKey;

    @Column(nullable = false, length = 128)
    private String assistanceType;

    @Column(nullable = false, length = 512)
    private String assistanceDescription;

    @Column(nullable = false, length = 128)
    private String customerName;

    @Column
    private String customerCnpj;

    @Column(nullable = false, length = 128)
    private String address;

    @Column(length = 128)
    private String personsName;

    @Column(length = 128)
    private String technicianName;

    @Column(nullable = false)
    private boolean orderOpen;

    @Column(nullable = false)
    private int priority;

    @Column(nullable = false)
    private BigDecimal amountCharged;

    @Column(nullable = false)
    private LocalDateTime openingDate;

    @Column()
    private LocalDateTime closingDate;


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public boolean isOrderOpen() {
        return orderOpen;
    }

    public void setOrderOpen(boolean orderOpen) {
        this.orderOpen = orderOpen;
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

    public LocalDateTime getOpeningDate() {
        return openingDate;
    }

    public void setOpeningDate(LocalDateTime openingDate) {
        this.openingDate = openingDate;
    }

    public LocalDateTime getClosingDate() {
        return closingDate;
    }

    public void setClosingDate(LocalDateTime closingDate) {
        this.closingDate = closingDate;
    }
}
