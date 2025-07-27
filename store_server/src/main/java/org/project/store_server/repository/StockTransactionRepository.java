package org.project.store_server.repository;

import org.project.store_server.entity.StockTransaction;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {


    @EntityGraph
    List<StockTransaction> getStockTransactionsByStockId(Long stockId);

}
