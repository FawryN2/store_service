package org.project.store_server.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.project.store_server.entity.Store;
import org.project.store_server.mapper.StoreMapper;
import org.project.store_server.model.dto.store.StoreRequestDto;
import org.project.store_server.model.dto.store.StoreResponseDTO;
import org.project.store_server.repository.StoreRepository;
import org.project.store_server.service.StoreService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;


    private Store findStore(Long storeId){
        return storeRepository.findById(storeId)
                .orElseThrow(()-> new EntityNotFoundException("There is no store with id" + " " +storeId));
    }

    @Override
    public List<StoreResponseDTO> getAllStores() {
        return storeRepository.findAll()
                .stream()
                .map(storeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StoreResponseDTO getStore(Long storeId) {

        Store existingStore = findStore(storeId);
        return storeMapper.toDTO(existingStore);

    }

    @Transactional
    @Override
    public void deleteStore(Long storeId) {
        Store existingStore = findStore(storeId);
        storeRepository.delete(existingStore);
    }

    @Transactional
    @Override
    public void addStore(StoreRequestDto storeRequestDto) {
        Store store = storeMapper.toEntity(storeRequestDto);
        storeRepository.save(store);
    }

    @Transactional
    @Override
    public StoreResponseDTO updateStore(Long storeId, StoreRequestDto storeRequestDto) {
        Store existingStore = findStore(storeId);
        existingStore.setName(storeRequestDto.getName());
        existingStore.setLocation(storeRequestDto.getLocation());
        storeRepository.save(existingStore);
        return storeMapper.toDTO(existingStore);
    }

    @Override
    public void deleteAllStores() {
        storeRepository.deleteAll();
    }
}
