package org.project.store_server.repository;

import org.project.store_server.entity.Stock;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

   Optional<Stock> findStockBySku(String sku);

   @EntityGraph(attributePaths = {"store"})
   List<Stock> findStocksByStoreId(Long storeId);

   Optional<Stock> findStockByStoreIdAndSku(Long storeId, String sku);


   boolean existsStockBySku(String sku);
}
