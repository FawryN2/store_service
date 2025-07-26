package org.project.store_server.mapper;

import org.mapstruct.Mapper;

import org.mapstruct.factory.Mappers;
import org.project.store_server.entity.Store;
import org.project.store_server.model.dto.store.StoreRequestDto;
import org.project.store_server.model.dto.store.StoreResponseDTO;

@Mapper(componentModel = "spring")
public interface StoreMapper{

    public StoreResponseDTO toDTO(Store store);
    public Store toEntity(StoreRequestDto storeRequestDto);
}
