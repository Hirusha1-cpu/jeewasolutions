package lk.example.jeewacomputers.purchase.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.purchase.entity.PurchaseStatus;

public interface PurchaseStatusDao extends JpaRepository<PurchaseStatus, Integer> {

    
} 