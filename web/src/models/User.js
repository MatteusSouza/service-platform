class User {
    constructor(
        id,
        cnpj,
        customerName,
        address,
        contactEmail,
        phoneNumber1,
        phoneNumber2,
        personContactName,
        personProfession,
        monthlyFee,
        expirationDay,
        registrationDate,
        activeCustomer
        ) {
        this.id = id;
        this.cnpj = cnpj;
        this.customerName = customerName;
        this.address = address;
        this.contactEmail = contactEmail;
        this.phoneNumber1 = phoneNumber1;
        this.phoneNumber2 = phoneNumber2;
        this.personContactName = personContactName;
        this.personProfession = personProfession;
        this.monthlyFee = monthlyFee;
        this.expirationDay = expirationDay;
        this.registrationDate = registrationDate;
        this.activeCustomer = activeCustomer;
    }
}

module.exports = User;


