package com.assignment.trackpocket.transactionservice.Repository;

import com.assignment.trackpocket.trackpocketmodel.Transaction.TransactionName;
import com.assignment.trackpocket.trackpocketmodel.Transaction.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionTypeRepository extends JpaRepository<TransactionType, Integer> {

    TransactionType findByName(TransactionName transActionName);

}
