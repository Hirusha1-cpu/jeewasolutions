package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.repair.entity.Repair;

public interface RepairDao extends JpaRepository<Repair, Integer> {
    @Query(value = "SELECT * FROM jeewacomputersproject.repair where id = ?1", nativeQuery = true)
    public Repair getRepairById(Integer id);
}
