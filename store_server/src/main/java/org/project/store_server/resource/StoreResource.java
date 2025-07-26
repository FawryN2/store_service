package org.project.store_server.resource;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.store_server.model.dto.stock.StockResponseDto;
import org.project.store_server.model.dto.store.StoreRequestDto;
import org.project.store_server.model.dto.store.StoreResponseDTO;
import org.project.store_server.service.StockService;
import org.project.store_server.service.StoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("stores")
public class StoreResource {

    private final StoreService storeService;
    private final StockService stockService;


    @GetMapping
    public ResponseEntity<List<StoreResponseDTO>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }



    @GetMapping("/{storeId}")
    public ResponseEntity<StoreResponseDTO> getStore(@PathVariable Long storeId){
        StoreResponseDTO store = storeService.getStore(storeId);
        return ResponseEntity.ok(store);
    }


    @PostMapping
    public ResponseEntity<Void> addStore(@RequestBody @Valid StoreRequestDto storeRequestDto) {
        storeService.addStore(storeRequestDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping("/{storeId}")
    public ResponseEntity<StoreResponseDTO> updateStore(@PathVariable Long storeId,
                                                        @RequestBody @Valid StoreRequestDto storeRequestDto){
        StoreResponseDTO updatedStore = storeService.updateStore(storeId,storeRequestDto);
        return ResponseEntity.ok(updatedStore);
    }


    @DeleteMapping("/{storeId}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long storeId){
        storeService.deleteStore(storeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @DeleteMapping
    public ResponseEntity<Void> deleteAllStores(){
        storeService.deleteAllStores();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


    @GetMapping("/{storeId}/stocks")
    public ResponseEntity<List<StockResponseDto>> getAllStocksForStore(@PathVariable long storeId){
        List<StockResponseDto> stocks = stockService.getAllStocksForStore(storeId);
        return ResponseEntity.ok(stocks);
    }
}
