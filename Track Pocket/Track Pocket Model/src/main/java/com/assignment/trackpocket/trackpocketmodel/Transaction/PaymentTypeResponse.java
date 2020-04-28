package com.assignment.trackpocket.trackpocketmodel.Transaction;

public class PaymentTypeResponse {

    private int id;
    private PaymentAccountName paymentType;

    public PaymentTypeResponse(int id, PaymentAccountName paymentType) {
    }

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
