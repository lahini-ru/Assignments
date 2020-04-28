package com.assignment.trackpocket.trackpocketmodel.Transaction;

import com.assignment.trackpocket.trackpocketmodel.User.UserSummary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
public class TransactionResponse {

    private int id;
    private String transactionType;
    private String paymentAccount;
    private String category;
    private UserSummary user;
    private String description;
    private double amount;
    private Instant transactionDateTime;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getPaymentAccount() {
        return paymentAccount;
    }

    public void setPaymentAccount(String paymentAccount) {
        this.paymentAccount = paymentAccount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public UserSummary getUser() {
        return user;
    }

    public void setUser(UserSummary user) {
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Instant getTransactionDateTime() {
        return transactionDateTime;
    }

    public void setTransactionDateTime(Instant transactionDateTime) {
        this.transactionDateTime = transactionDateTime;
    }
}
