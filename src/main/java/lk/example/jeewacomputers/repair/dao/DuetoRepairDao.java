package lk.example.jeewacomputers.repair.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.repair.entity.DiagnosedItems;
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

    @Query(value = "select d from DuetoRepair d where d.repairtype = ?1 and d.statusofrepair = 'pending diagnosis '  ")
    public List<DuetoRepair> getDueRepairByStatus(String repairtype);

    @Query(value = "select d from DuetoRepair d where d.statusofrepair != 'Completed' or d.statusofrepair != 'Paid'")
    public List<DuetoRepair> getDueRepairByWithoutComplted();

    @Query(value = "select d from DuetoRepair d where d.barcode = ?1")
    public DuetoRepair getDueRepairByBarcode(String barcode);

    @Query(value = "select d from DuetoRepair d where d.statusofrepair = 'Approved'")
    public List<DuetoRepair> getDueRepairByStatusApprove();

    @Query(value = "select d from DuetoRepair d where  d.statusofrepair ='Diagnoesed'")
    public List<DuetoRepair> getDueRepairByStatusForProcessing();

    @Query(value = "select d from DuetoRepair d where  d.statusofrepair !='pending diagnosis' and d.statusofrepair !='Return To Company' and d.statusofrepair !='Paid' ")
    public List<DuetoRepair> getDueRepairBywithoutreturnCompanyandpending();

    @Query(value = "select ui from UsedItems ui where ui.due_to_repairitem_id.id in (select d.id from DuetoRepair d where d.repairid = ?1)")
    public List<UsedItems> getUsedItemsByDue(Integer repairid);

    @Query(value = "select di from DiagnosedItems di where di.due_to_repairitem_id.id in (select d.id from DuetoRepair d where d.repairid = ?1)")
    public List<DiagnosedItems> getDiagnoseItemsByDue(Integer repairid);

    @Query(value ="SELECT CONCAT('brcode',lpad((SUBSTRING(barcodeforrepair, 7, 6))+1,5,0)) as barcodeforrepair FROM jeewacomputersproject.due_to_repairitem as s where barcodeforrepair = ?1",nativeQuery = true)
    // @Query(value ="select CONCAT('bcode',lpad((SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno from SerialNo s where s.barcode = ?1")
    public String getItemNextBarcode(String barcodeforrepair);

    @Query(value ="SELECT CONCAT('brcode',lpad(max(SUBSTRING(barcodeforrepair, 7, 6))+1,5,0),?1) as repno FROM jeewacomputersproject.due_to_repairitem as s;",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public String getItemBarcode(Integer id);
    
    @Query(value ="SELECT barcodeforrepair FROM jeewacomputersproject.due_to_repairitem where barcodeforrepair = ?1 ",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public String getItemBarcodeFromBarcode(String barcode);

    @Query(value ="SELECT max(id) FROM jeewacomputersproject.due_to_repairitem;",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public Integer getMaxId();

    // @Query(value ="SELECT s.barcode FROM DuetoRepair s where s.barcode = ?1")
    // public String getExistItemBarcode(String barcode );

    
    @Query(value ="SELECT barcodeforrepair FROM jeewacomputersproject.due_to_repairitem where id = ?1",nativeQuery = true)
    public String getExistItemBarcode(Integer id );



    @Query(value ="SELECT s FROM DuetoRepair s where s.statusofrepair = ?1")
    public List<DuetoRepair> getItemsFromStatus(String statusofrepair );

    






    
} 