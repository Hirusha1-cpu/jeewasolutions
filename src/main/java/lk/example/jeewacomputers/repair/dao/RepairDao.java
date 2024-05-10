package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.repair.entity.Repair;

public interface RepairDao extends JpaRepository<Repair, Integer> {
    
}
