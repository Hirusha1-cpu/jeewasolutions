package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.Monitor;

public interface MonitorDao extends JpaRepository<Monitor, Integer>{

    
}