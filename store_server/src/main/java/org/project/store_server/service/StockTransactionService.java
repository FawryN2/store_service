package org.project.store_server.service;

import org.project.store_server.entity.Stock;

import java.time.LocalDateTime;

public interface StockTransactionService {

    String addTransaction(Long storeId, String sku , LocalDateTime createdAt , Long consumedQuantity, Stock stock);
}
