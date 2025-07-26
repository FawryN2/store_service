package org.project.store_server.service;

import org.project.store_server.model.dto.store.StoreRequestDto;
import org.project.store_server.model.dto.store.StoreResponseDTO;
import java.util.List;


public interface StoreService {
    List<StoreResponseDTO> getAllStores();
    StoreResponseDTO getStore(Long storeId);
    void deleteStore(Long storeId);
    void addStore(StoreRequestDto storeRequestDto);
    StoreResponseDTO updateStore(Long storeId, StoreRequestDto storeRequestDto);
    void deleteAllStores();
}
