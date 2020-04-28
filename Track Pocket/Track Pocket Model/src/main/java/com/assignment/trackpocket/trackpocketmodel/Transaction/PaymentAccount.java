package com.assignment.trackpocket.trackpocketmodel.Transaction;


import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "payment_account")
public class PaymentAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    private PaymentAccountName paymentType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public PaymentAccountName getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentAccountName paymentType) {
        this.paymentType = paymentType;
    }

}
