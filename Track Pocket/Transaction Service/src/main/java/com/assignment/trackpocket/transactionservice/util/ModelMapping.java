package com.assignment.trackpocket.transactionservice.util;


import com.assignment.trackpocket.trackpocketmodel.Category.Category;
import com.assignment.trackpocket.trackpocketmodel.Transaction.PaymentAccount;
import com.assignment.trackpocket.trackpocketmodel.Transaction.Transaction;
import com.assignment.trackpocket.trackpocketmodel.Transaction.TransactionResponse;
import com.assignment.trackpocket.trackpocketmodel.Transaction.TransactionType;
import com.assignment.trackpocket.trackpocketmodel.User.User;
import com.assignment.trackpocket.trackpocketmodel.User.UserSummary;

public class ModelMapping {

    public static TransactionResponse mapTransactionToTransactionResponse(Transaction transaction, TransactionType transactionType, PaymentAccount paymentAccount, Category category, User creator) {
        TransactionResponse transactionResponse = new TransactionResponse();

        UserSummary creatorSummary = new UserSummary(creator.getuid(), creator.getUserName(), creator.getFullName());

        String transType = transactionType.getName().toString();
        String payType = paymentAccount.getPaymentType().toString();
        String catType = category.getCategoryName().toString();

        transactionResponse.setId(transaction.getId());
        transactionResponse.setTransactionType(transType);
        transactionResponse.setCategory(catType);
        transactionResponse.setPaymentAccount(payType);
        transactionResponse.setAmount(transaction.getAmount());
        transactionResponse.setDescription(transaction.getDescription());
        transactionResponse.setUser(creatorSummary);
        transactionResponse.setTransactionDateTime(transaction.getTransactionDateTime());



        return transactionResponse;
    }

}
