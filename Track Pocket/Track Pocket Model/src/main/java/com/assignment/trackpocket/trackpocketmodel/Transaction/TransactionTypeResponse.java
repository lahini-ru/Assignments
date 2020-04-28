package com.assignment.trackpocket.trackpocketmodel.Transaction;


public class TransactionTypeResponse {

    private int id;
    private TransactionName name;

    public TransactionTypeResponse(int id, TransactionName name) {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public TransactionName getName() {
        return name;
    }

    public void setName(TransactionName name) {
        this.name = name;
    }
}
