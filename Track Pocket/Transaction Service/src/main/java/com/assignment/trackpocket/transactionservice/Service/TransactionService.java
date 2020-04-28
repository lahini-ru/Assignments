package com.assignment.trackpocket.transactionservice.Service;

import com.assignment.trackpocket.trackpocketmodel.User.User;
import com.assignment.trackpocket.trackpocketmodel.User.UserSecurity;
import com.assignment.trackpocket.transactionservice.util.ModelMapping;
import com.assignment.trackpocket.trackpocketmodel.Transaction.*;
import com.assignment.trackpocket.transactionservice.Repository.PaymentAccountRepository;
import com.assignment.trackpocket.transactionservice.Repository.TransactionRepository;
import com.assignment.trackpocket.transactionservice.Repository.TransactionTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionTypeRepository transactionTypeRepository;

    @Autowired
    PaymentAccountRepository paymentAccountRepository;

    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    public PagedResponse<TransactionResponse> getAllTransactions(UserSecurity currentUser, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Transaction> transactions = transactionRepository.findByCreatedBy(currentUser.getuId(),pageable);

        if(transactions.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), transactions.getNumber(),
                    transactions.getSize(), transactions.getTotalElements(), transactions.getTotalPages(), transactions.isLast());
        }

        User user = new User(currentUser.getUsername());

        List<TransactionResponse> transactionResponses = transactions.map(transaction -> {
            return ModelMapping.mapTransactionToTransactionResponse
                    (transaction, transaction.getTransactionType(), transaction.getPaymentAccount(), transaction.getCategory(),user);
        }).getContent();

        return new PagedResponse<>(transactionResponses, transactions.getNumber(),
                transactions.getSize(), transactions.getTotalElements(),
                transactions.getTotalPages(), transactions.isLast());
    }

    public Transaction addTransaction(TransactionRequest transactionRequest, UserSecurity currentUser) {
        Transaction transaction = new Transaction();

        TransactionName transactionName = convertToTransName(transactionRequest);
        PaymentAccountName paymentAccountName = convertToPaymentName(transactionRequest);


        transaction.setTransactionType(getTransactionType(transactionName));
        transaction.setPaymentAccount(getPaymentType(paymentAccountName));
        transaction.setDescription(transactionRequest.getNote());
        transaction.setAmount(Double.valueOf(transactionRequest.getAmount()));
        transaction.setTransactionDateTime(transactionRequest.getDate());
        return transactionRepository.save(transaction);
    }


    public TransactionName convertToTransName(TransactionRequest transactionRequest) {
        TransactionName transactionName = TransactionName.valueOf(transactionRequest.getTransactionType());
        return transactionName;
    }

    public TransactionType getTransactionType(TransactionName transactionName) {
            return transactionTypeRepository.findByName(transactionName);
    }

    public PaymentAccountName convertToPaymentName(TransactionRequest transactionRequest){
        PaymentAccountName paymentAccountName = PaymentAccountName.valueOf(transactionRequest.getPaymentType());
        return paymentAccountName;
    }

    public PaymentAccount getPaymentType(PaymentAccountName paymentAccountName) {
        return paymentAccountRepository.findByPaymentType(paymentAccountName);
    }



}
