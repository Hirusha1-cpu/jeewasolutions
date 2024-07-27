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

    @Query(value = "SELECT * FROM jeewacomputersproject.repair where customer_id in (SELECT id from jeewacomputersproject.customer where name = ?1) and id != iddue;", nativeQuery = true)
    public List<Repair> getRepairByCustomerName(String name , Integer iddue);

    @Query(value ="SELECT CONCAT('R',lpad((SUBSTRING(repairno, 2, 1))+1,5,0)) as repairno FROM jeewacomputersproject.repair as s where repairno = ?1;",nativeQuery = true)
    // @Query(value ="select CONCAT('bcode',lpad((SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno from SerialNo s where s.barcode = ?1")
    public String getItemNextBarcode(String repairno);

    @Query(value ="SELECT CONCAT('R',lpad(max(SUBSTRING(repairno, 2, 1))+1,5,0),?1) as repno FROM jeewacomputersproject.repair as s;",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public String getItemBarcode(Integer id);

    @Query(value ="SELECT max(id) FROM jeewacomputersproject.repair;",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public Integer getMaxId();

    @Query(value ="SELECT s.repairno FROM Repair s where s.repairno = ?1")
    public String getExistItemBarcode(String repairno );

    


 
    



}