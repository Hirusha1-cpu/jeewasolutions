package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.grnanditem.entity.AvailableItems;

public interface AvailableItemsDao extends JpaRepository<AvailableItems, Integer> {

    
} 
