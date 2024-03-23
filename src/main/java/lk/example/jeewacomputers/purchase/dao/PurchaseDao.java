package lk.example.jeewacomputers.purchase.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.purchase.entity.Purchase;

public interface PurchaseDao extends JpaRepository<Purchase, Integer> {

    
} 
