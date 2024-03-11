package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import lk.example.jeewacomputers.items.entity.Processor;

public interface ProcessorDao extends JpaRepository<Processor, Integer>{

    
} 