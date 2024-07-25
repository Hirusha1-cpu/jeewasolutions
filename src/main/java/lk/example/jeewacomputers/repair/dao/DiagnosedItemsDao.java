package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.repair.entity.DiagnosedItems;

public interface DiagnosedItemsDao extends  JpaRepository<DiagnosedItems, Integer> {

    
}
