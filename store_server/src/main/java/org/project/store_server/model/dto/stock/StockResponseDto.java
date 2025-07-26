package org.project.store_server.model.dto.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockResponseDto {

    private Long id;
    private Long storeId;
    private String sku;
    private Long quantity;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
