package org.project.store_server.service;

import org.project.store_server.entity.StockTransaction;
import org.project.store_server.model.dto.product.ProductRequestDto;
import org.project.store_server.model.dto.stock.StockRequestDto;
import org.project.store_server.model.dto.stock.StockResponseDto;

import java.util.List;

public interface StockService {

    // CRUD Operations
    StockResponseDto getStock(Long StockId);
    List<StockResponseDto> getAllStocksForStore(Long storeId);
    List<StockResponseDto> getAllStocks();
    StockResponseDto addStock(Long storeId, StockRequestDto stockRequestDto);
    StockResponseDto updateStock(Long stockId,  StockRequestDto stockRequestDto);
    String deleteStock(Long stockId);
    String deleteAllStocks();

    // operations
    String consumeProduct(Long storeId, String sku, ProductRequestDto productRequestDto);


}
