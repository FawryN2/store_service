package org.project.store_server.service.impl;

import lombok.RequiredArgsConstructor;
import org.project.store_server.entity.Stock;
import org.project.store_server.entity.StockTransaction;
import org.project.store_server.repository.StockTransactionRepository;
import org.project.store_server.service.StockTransactionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class StockTransactionServiceImpl implements StockTransactionService {

    private final StockTransactionRepository stockTransactionRepository;

    @Override
    public String addTransaction(Long storeId, String sku, LocalDateTime createdAt, Long consumedQuantity, Stock stock) {

        StockTransaction stockTransaction = new StockTransaction();
        stockTransaction.setStoreId(storeId);
        stockTransaction.setSku(sku);
        stockTransaction.setCreatedAt(LocalDateTime.now());
        stockTransaction.setConsumedQuantity(consumedQuantity);
        stockTransaction.setStock(stock);
        stockTransactionRepository.save(stockTransaction);

        return "Stock Consumption has been saved successfully";

    }
}
