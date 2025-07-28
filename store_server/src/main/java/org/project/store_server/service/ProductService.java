package org.project.store_server.service;

import org.project.store_server.model.dto.product.ProductResponseModel;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProductService {
    Boolean checkProductAvailability(String sku);
    List<ProductResponseModel> getAllProducts();
}
