package lk.example.jeewacomputers.purchase.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.purchase.entity.PurchaseHasCategory;

public interface PurchaseHasCategoryDao extends JpaRepository<PurchaseHasCategory, Integer>{

    
} 