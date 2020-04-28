package com.assignment.trackpocket.trackpocketmodel.Category;

import com.assignment.trackpocket.trackpocketmodel.Transaction.AddBy;
import com.assignment.trackpocket.trackpocketmodel.Transaction.TransactionType;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "category")
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transactionType_id", nullable = false)
    private TransactionType transactionType;

    @Column(name = "category_name")
    private String categoryName;

    @Enumerated(EnumType.STRING)
    @Column(name = "add_by")
    private AddBy addBy;

    public Category(TransactionType transactionType, String categoryName, AddBy addBy) {
        this.transactionType = transactionType;
        this.categoryName = categoryName;
        this.addBy = addBy;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
