package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.repair.entity.UsedItems;

public interface UsedItemDao extends JpaRepository<UsedItems, Integer> {

    
} 
