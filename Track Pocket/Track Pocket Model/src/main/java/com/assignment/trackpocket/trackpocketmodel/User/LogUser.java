package com.assignment.trackpocket.trackpocketmodel.User;

import javax.persistence.*;
import java.time.LocalDateTime;

public class LogUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int loggingId;
    @ManyToOne
    @JoinColumn
    User user;
    LocalDateTime loggingTime;
    LocalDateTime logoutTime;

}
