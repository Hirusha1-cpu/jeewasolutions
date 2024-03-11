package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.Ram;

public interface RamDao extends JpaRepository<Ram, Integer> {

    
} 
