package org.project.store_server.model.dto.stock;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockRequestDto {

    @NotNull(message = "sku must not bu empty")
    @NotBlank(message = "sku must not be blank")
    @Column(unique = true)
    private String sku;

    @NotNull(message = "quantity must be provided")
    @PositiveOrZero(message = "quantity must be a greater than or equals zero")
    private Long quantity;

}
