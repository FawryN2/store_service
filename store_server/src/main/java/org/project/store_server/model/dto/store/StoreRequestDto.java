package org.project.store_server.model.dto.store;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreRequestDto {

    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "location is required")
    private String location;

}
