package com.assignment.trackpocket.trackpocketmodel.Transaction;
import javax.persistence.*;

@Entity
@Table(name ="transaction_type")
public class TransactionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private TransactionName name;


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