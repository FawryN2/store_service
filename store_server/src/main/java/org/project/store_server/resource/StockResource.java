package org.project.store_server.resource;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.store_server.model.dto.product.ProductRequestDto;
import org.project.store_server.model.dto.stock.StockRequestDto;
import org.project.store_server.model.dto.stock.StockResponseDto;
import org.project.store_server.service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("stocks")
public class StockResource {

    private final StockService stockService;

    @GetMapping
    public ResponseEntity<List<StockResponseDto>> getAllStocks(){
        List<StockResponseDto> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/{stockId}")
    public ResponseEntity<StockResponseDto> getStock(@PathVariable Long stockId){
        StockResponseDto stock = stockService.getStock(stockId);
        return ResponseEntity.ok(stock);
    }
    @PostMapping("/store/{storeId}")
    public ResponseEntity<StockResponseDto> addStock(@PathVariable Long storeId , @RequestBody @Valid StockRequestDto stockRequestDto){
        StockResponseDto savedStock = stockService.addStock(storeId , stockRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStock);
    }

    @PutMapping("/{stockId}")
    public ResponseEntity<StockResponseDto> updateStock(@PathVariable Long stockId , @RequestBody @Valid StockRequestDto stockRequestDto){
        StockResponseDto updatedStock = stockService.updateStock(stockId , stockRequestDto);
        return ResponseEntity.ok(updatedStock);
    }


    @DeleteMapping("/{stockId}")
    public ResponseEntity<String> deleteStock(@PathVariable Long stockId){
        return ResponseEntity.status(HttpStatus.OK).body(stockService.deleteStock(stockId));
    }


    @DeleteMapping
    public ResponseEntity<String> deleteAllStocks(){
        return ResponseEntity.status(HttpStatus.OK).body(stockService.deleteAllStocks());

    }



    @PostMapping("/consume")
    public ResponseEntity<String> consumeStock(@RequestParam Long storeId,
                                               @RequestParam String sku,
                                               @RequestBody @Valid ProductRequestDto productRequestDto){


        return ResponseEntity.ok(stockService.consumeProduct(storeId,sku,productRequestDto));

    }






}
