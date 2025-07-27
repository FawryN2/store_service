package org.project.store_server.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.project.store_server.entity.Stock;
import org.project.store_server.entity.Store;
import org.project.store_server.exception.ConflictException;
import org.project.store_server.exception.InsufficientAmountException;
import org.project.store_server.mapper.StockMapper;
import org.project.store_server.model.dto.product.ProductRequestDto;
import org.project.store_server.model.dto.stock.StockRequestDto;
import org.project.store_server.model.dto.stock.StockResponseDto;
import org.project.store_server.repository.StockRepository;
import org.project.store_server.repository.StoreRepository;
import org.project.store_server.service.ProductService;
import org.project.store_server.service.StockService;
import org.project.store_server.service.StockTransactionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class StockServiceImpl implements StockService {

    private final StoreRepository storeRepository;
    private final StockRepository stockRepository;
    private final ProductService productService;
    private final StockTransactionService stockTransactionService;
    private final StockMapper stockMapper;


    private Stock findStock(Long stockId){
       return  stockRepository.findById(stockId)
                .orElseThrow( ()-> new EntityNotFoundException("Stock with ID" + " " + stockId + " " + "NotFound"));
    }


    @Override
    public StockResponseDto getStock(Long stockId) {
        Stock existingStock = this.findStock(stockId);
        return stockMapper.toDto(existingStock);
    }


    @Override
    public List<StockResponseDto> getAllStocksForStore(Long storeId) {
        if(!storeRepository.existsById(storeId)){
            throw new EntityNotFoundException("Store with ID" + " " + storeId + " " + "Not found");
        }
        return stockRepository.findStocksByStoreId(storeId)
                .stream()
                .map(stockMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public List<StockResponseDto> getAllStocks() {
        return stockRepository.findAll()
                .stream()
                .map(stockMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public StockResponseDto addStock(Long storeId, StockRequestDto stockRequestDto) {
        String sku = stockRequestDto.getSku();
        stockRepository.findStockBySku(sku)
                .ifPresent(stock -> {
                    throw new ConflictException("The stock for product with code" + " " + sku + " " + "already exists");
                });

        boolean isProductAvailable = productService.checkProductAvailability(sku);
        if(!isProductAvailable){
            throw new EntityNotFoundException("The product with" + " " + sku + "is not available in stock");
        }

        Store store = storeRepository.findById(storeId)
                .orElseThrow(()-> new EntityNotFoundException("Store with ID" + " " + storeId + " " + "Not found"));


        Stock stock = stockMapper.toEntity(stockRequestDto);
        stock.setStore(store);
        stock.setSku(stockRequestDto.getSku());
        stock.setCreatedAt(LocalDateTime.now());
        stock.setUpdatedAt(LocalDateTime.now());
        stock.setQuantity(stockRequestDto.getQuantity());

        stockRepository.save(stock);
        return stockMapper.toDto(stock);
    }

    @Transactional
    @Override
    public StockResponseDto updateStock(Long stockId, StockRequestDto stockRequestDto) {
        Stock existingStock = this.findStock(stockId);
        String sku = stockRequestDto.getSku();
        if(!stockRepository.existsStockBySku(sku)){
            throw new EntityNotFoundException("Stock with sku" + " { " + sku + " } " + "not found");
        }
        existingStock.setQuantity(stockRequestDto.getQuantity());
        existingStock.setUpdatedAt(LocalDateTime.now());
        stockRepository.save(existingStock);

        return stockMapper.toDto(existingStock);
    }


    @Transactional
    @Override
    public String deleteStock(Long stockId) {
        Stock existingStock = this.findStock(stockId);
        stockRepository.delete(existingStock);
        return "Stock with Id" + " " + stockId + " " + "has been deleted";
    }


    @Override
    public String deleteAllStocks() {
        stockRepository.deleteAll();
        return "All stocks have been deleted";
    }

    @Transactional
    @Override
    public String consumeProduct(Long storeId, String sku , ProductRequestDto productRequestDto) {

        boolean isProductAvailable = productService.checkProductAvailability(sku);
        if(!isProductAvailable){
            throw new EntityNotFoundException("The product with" + " " + sku + "is not available in stock");
        }

        Stock stock = stockRepository.findStockByStoreIdAndSku(storeId, sku)
                .orElseThrow(()-> new EntityNotFoundException("Stock not found for ID" + storeId + " " + "and SKU" + " " + sku));


        // consuming product Logic

        Long stockQuantity = stock.getQuantity();
        Long consumedQuantity = productRequestDto.getQuantity();

        if(consumedQuantity> stockQuantity){
            throw new InsufficientAmountException("There is no enough amount of this product");
        }

        stock.setQuantity(stockQuantity-consumedQuantity);

        // logging stock consumption
        return stockTransactionService.addTransaction(storeId, sku , LocalDateTime.now() , consumedQuantity , stock);

    }


}
