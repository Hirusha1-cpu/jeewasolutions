package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.repair.entity.DuetoRepair;
import lk.example.jeewacomputers.repair.entity.Repair;
import lk.example.jeewacomputers.repair.entity.UsedItems;
import java.util.*;

public interface DuetoRepairDao extends JpaRepository<DuetoRepair, Integer>{

    
    @Query(value = "SELECT * FROM jeewacomputersproject.repair where id = ?1;", nativeQuery = true)
    public Repair getRepairById2(Integer id);
   
    @Query(value = "SELECT * FROM jeewacomputersproject.repair WHERE id IN (SELECT repair_id.id FROM jeewacomputersproject.due_to_repairitem WHERE repairid = ?1);", nativeQuery = true)
    public Repair getRepairByDue2(Integer repairid);

    @Query(value = "select r from Repair r where r.id in (select d.repair_id.id from DuetoRepair d where d.repairid = ?1)")
    public Repair getRepairByDue(Integer repairid);

    @Query(value = "select d from DuetoRepair d where d.repairtype = ?1 and d.statusofrepair = 'pending diagnosis'")
    public List<DuetoRepair> getDueRepairByStatus(String repairtype);

    @Query(value = "select d from DuetoRepair d where  d.statusofrepair ='Diagnoesed'")
    public List<DuetoRepair> getDueRepairByStatusForProcessing();

    @Query(value = "select ui from UsedItems ui where ui.due_to_repairitem_id.id in (select d.id from DuetoRepair d where d.repairid = ?1)")
    public List<UsedItems> getUsedItemsByDue(Integer repairid);





    
} 