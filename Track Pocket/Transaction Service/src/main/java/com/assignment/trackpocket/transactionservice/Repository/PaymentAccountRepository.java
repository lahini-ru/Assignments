package com.assignment.trackpocket.transactionservice.Repository;

import com.assignment.trackpocket.trackpocketmodel.Transaction.PaymentAccount;
import com.assignment.trackpocket.trackpocketmodel.Transaction.PaymentAccountName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentAccountRepository extends JpaRepository<PaymentAccount, Integer> {

    PaymentAccount findByPaymentType(PaymentAccountName paymentName);
}
