package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.repair.entity.Repair;

public interface RepairDao extends JpaRepository<Repair, Integer> {
    @Query(value = "SELECT * FROM jeewacomputersproject.repair where id = ?1;", nativeQuery = true)
    public Repair getRepairById(Integer id);

    @Query(value = "SELECT max(repair_id)+1 FROM jeewacomputersproject.due_to_repairitem;", nativeQuery = true)
    public Integer getMaxRepairId();

    @Query(value = "SELECT * FROM jeewacomputersproject.repair where customer_id in (SELECT id from jeewacomputersproject.customer where name = ?1);", nativeQuery = true)
    public List<Repair> getRepairByCustomerName(String name);




}