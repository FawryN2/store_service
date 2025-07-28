package org.project.store_server.model.dto.product;

import lombok.Data;

@Data
public class ProductResponseModel {
    private Long id;
    private String categoryName;
    private String name;
    private String sku;
    private String brand;
    private String description;
    private Double price;
    private String imageUrl;
    private Boolean isActive ;
}
