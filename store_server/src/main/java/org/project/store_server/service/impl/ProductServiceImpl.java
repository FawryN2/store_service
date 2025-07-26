package org.project.store_server.service.impl;

import org.project.store_server.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public Boolean checkProductAvailability(String sku) {
        return true;
    }
}
