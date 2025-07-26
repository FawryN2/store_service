package org.project.store_server.model.dto.store;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreResponseDTO {
    private Integer id;
    private String name;
    private String location;
}
