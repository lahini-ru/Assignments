package com.assignment.trackpocket.transactionservice.Controller;

import com.assignment.trackpocket.trackpocketmodel.User.CurrentUser;
import com.assignment.trackpocket.trackpocketmodel.User.UserSecurity;
import com.assignment.trackpocket.transactionservice.Service.TransactionService;
import com.assignment.trackpocket.trackpocketmodel.Transaction.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

    @GetMapping
    public PagedResponse<TransactionResponse> getAllTransactions(@CurrentUser UserSecurity currentUser,
                                                                 @RequestParam(value="page") int page,
                                                                 @RequestParam(value = "size") int size) {
        return transactionService.getAllTransactions(currentUser, page, size);
    }

    @PostMapping("/add")
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addTransaction(@CurrentUser UserSecurity currentUser, @RequestBody TransactionRequest transactionRequest) {
         Transaction transaction = transactionService.addTransaction(transactionRequest, currentUser);


        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{transactionId}")
                .buildAndExpand(transaction.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Transaction added Successfully"));
    }
}
