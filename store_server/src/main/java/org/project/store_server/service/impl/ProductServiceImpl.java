package org.project.store_server.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.project.store_server.exception.ClientErrorException;
import org.project.store_server.exception.ExternalServiceException;
import org.project.store_server.model.dto.product.ProductResponseModel;
import org.project.store_server.service.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final WebClient webClient;

    @Value("${check.product.availability.url}")
    private String productAvailabilityUrl;

    @Value("${list.products.url}")
    private String getAllProductsUrl;

    @Override
    public Boolean checkProductAvailability(String sku) {
        return webClient.get()
                .uri(productAvailabilityUrl,sku)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response->{
                    if(response.statusCode() == HttpStatus.NOT_FOUND){
                        return Mono.error(new EntityNotFoundException("Product with sku" + " " + sku + " " + "is not available"));
                    }
                    return Mono.error(new ClientErrorException("Client error: " + response.statusCode()));
                })
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new ExternalServiceException("External service error: " + response.statusCode()))
                )
                .bodyToMono(Boolean.class)
                .block();
    }

    @Override
    public List<ProductResponseModel> getAllProducts() {
        return webClient.get()
                .uri(getAllProductsUrl)
                .retrieve()
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new ExternalServiceException("External service error: " + response.statusCode()))
                )
                .bodyToFlux(ProductResponseModel.class)
                .collectList()
                .block();
    }


}
