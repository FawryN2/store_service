package org.project.store_server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StockTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Stock stock;

    @Column(nullable = false)
    private String sku;

    @Column(nullable = false)
    private Long storeId;

    @Column(nullable = false)
    @PositiveOrZero(message = "Amount must be positive or zero")
    private Long consumedQuantity;

    private LocalDateTime createdAt = LocalDateTime.now() ;


}