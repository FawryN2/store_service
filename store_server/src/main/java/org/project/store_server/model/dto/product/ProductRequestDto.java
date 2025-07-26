package org.project.store_server.model.dto.product;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {
    @NotNull
    @PositiveOrZero(message = "quantity must be a greater than or equals zero")
    private Long quantity;
}



