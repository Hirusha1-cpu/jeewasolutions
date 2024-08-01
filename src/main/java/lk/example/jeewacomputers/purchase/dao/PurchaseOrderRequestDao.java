package lk.example.jeewacomputers.purchase.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.purchase.entity.PurchaseOrderRequest;

public interface PurchaseOrderRequestDao extends JpaRepository<PurchaseOrderRequest, Integer> {
    
}
