package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.PowerSupply;

public interface PowerSupplyDao extends JpaRepository<PowerSupply, Integer> {

    
} 