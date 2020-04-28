package com.assignment.trackpocket.trackpocketmodel.User;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {
                        "username" }),
                @UniqueConstraint(columnNames = {
                        "email" })
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotBlank
    private long uid;

    @NotBlank
    @Size(max = 80)
    private String fullName;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 40)
    private String userName;

    @NotBlank
    @Size(max = 20)
    private String password;

    @OneToMany(mappedBy = "user")
    private List<LogUser> loggingDetails;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @CreatedDate
    private Instant createdAt;

    public User() {
    }

    public User(@NotBlank @Size(max = 80) String fullName,  @NotBlank @Size(max = 40) @Email String email, @NotBlank @Size(max = 40) String userName, @NotBlank @Size(max = 20) String password) {
        this.fullName = fullName;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    public User(String username) {
    }

    public long getuid() {
        return uid;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
