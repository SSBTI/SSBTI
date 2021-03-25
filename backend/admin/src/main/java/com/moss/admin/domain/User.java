package com.moss.admin.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", unique = true)
    private String userId;

    @Column(name="password", nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    private UserRole role;


    @CreationTimestamp
    private LocalDateTime createdAt;
    private LocalDateTime visitedAt;
}
