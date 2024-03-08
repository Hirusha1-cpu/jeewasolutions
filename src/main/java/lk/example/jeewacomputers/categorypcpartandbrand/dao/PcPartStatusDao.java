package lk.example.jeewacomputers.categorypcpartandbrand.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.categorypcpartandbrand.entity.PcPartStatus;

public interface PcPartStatusDao extends JpaRepository<PcPartStatus, Integer> {

    
} 