package com.assignment.trackpocket.transactionservice.Repository;

import com.assignment.trackpocket.trackpocketmodel.Transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findByCreatedBy(Long userId, Pageable pageable);
}
