package org.project.store_server.service;

import org.project.store_server.entity.Stock;
import org.project.store_server.entity.StockTransaction;

import java.time.LocalDateTime;
import java.util.List;

public interface StockTransactionService {

    String addTransaction(Long storeId, String sku , LocalDateTime createdAt , Long consumedQuantity, Stock stock);
    List<StockTransaction> getAllStockTransactionsForStock(long stockId);
}
