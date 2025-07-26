package org.project.store_server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.project.store_server.entity.Stock;
import org.project.store_server.model.dto.stock.StockRequestDto;
import org.project.store_server.model.dto.stock.StockResponseDto;

@Mapper(componentModel = "spring")
public interface StockMapper {

    Stock toEntity(StockRequestDto stockRequestDto);

    @Mapping(target = "storeId" , source = "store.id")
    StockResponseDto toDto(Stock stock);


}
