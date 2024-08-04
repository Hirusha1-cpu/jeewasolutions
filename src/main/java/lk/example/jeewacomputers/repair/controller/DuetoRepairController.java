package lk.example.jeewacomputers.repair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.math.BigDecimal;

import lk.example.jeewacomputers.repair.dao.DiagnosedItemsDao;
import lk.example.jeewacomputers.repair.dao.DuetoRepairDao;
import lk.example.jeewacomputers.repair.dao.UsedItemDao;
import lk.example.jeewacomputers.repair.entity.DiagnosedItems;
import lk.example.jeewacomputers.repair.entity.DuetoRepair;
import lk.example.jeewacomputers.repair.entity.Repair;
import lk.example.jeewacomputers.repair.entity.UsedItems;
import java.util.*;

@RestController
public class DuetoRepairController {
    @Autowired
    private DuetoRepairDao duetoRepairDao;
    @Autowired
    private DiagnosedItemsDao diagnosedItemsDao;
    @Autowired
    private UsedItemDao usedItemDao;

    @GetMapping(value = "/duerepair/getlist", produces = "application/json")
    public List<DuetoRepair> findAlls() {
        // login user authentication and authorization
        return duetoRepairDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/duerepair/getlist/{id}", produces = "application/json")
    public DuetoRepair findDueRepair(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return duetoRepairDao.getReferenceById(id);
    }



    @PostMapping(value = "/duerepair")
    public String save(@RequestBody DuetoRepair duetoRepair) {
        duetoRepairDao.save(duetoRepair);
        return "OK";
    }

     @GetMapping(value = "/duerepair/getrepairbydue/{id}", produces = "application/json")
    public Repair findRepair(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return duetoRepairDao.getRepairByDue(id);
    }
     @GetMapping(value = "/duerepair/getrepairbybarcode/{barcode}", produces = "application/json")
    public DuetoRepair findRepairByBarcode(@PathVariable("barcode") String barcode) {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairByBarcode(barcode);
    }
     @GetMapping(value = "/duerepair/getrepairbybarcode", produces = "application/json")
    public List<DuetoRepair> findRepairsByBarcode() {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairByWithoutComplted();
    }

     @GetMapping(value = "/duerepair/getduebystatus/{type}", produces = "application/json")
    public List<DuetoRepair> findRepairBytype(@PathVariable("type") String repairtype) {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairByStatus(repairtype);}

    //  @GetMapping(value = "/duerepair/getduebystatusone/{type}", produces = "application/json")
    // public List<DuetoRepair> findRepairBytypeOne(@PathVariable("type") String repairtype) {
    //     // login user authentication and authorization
    //     return duetoRepairDao.getDueRepairByStatusOne(repairtype);
    // }

     @GetMapping(value = "/duerepair/getduebystatusapproved", produces = "application/json")
    public List<DuetoRepair> findRepairBytypeApprove() {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairByStatusApprove();
    }
     @GetMapping(value = "/duerepair/getduebystatusshopitemone/{itemname}", produces = "application/json")
    public DuetoRepair findRepairBytypeApproveOne(@PathVariable("itemname") String itemname) {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairByStatusShopItem(itemname);
    }
     @GetMapping(value = "/duerepair/getduebystatusstatusofrepair/{status}", produces = "application/json")
    public List<DuetoRepair> findRepairBytypeForProcess(@PathVariable("status") String statusofrepair) {
        // login user authentication and authorization
        return duetoRepairDao.getItemsFromStatus(statusofrepair);
    }

     @GetMapping(value = "/duerepair/getduebystatusforprocess", produces = "application/json")
    public List<DuetoRepair> findRepairBystatus() {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairByStatusForProcessing();
    }

     @GetMapping(value = "/duerepair/getduebystatusfordiagnoesedcompleted", produces = "application/json")
    public List<DuetoRepair> findRepairForPay() {
        // login user authentication and authorization
        return duetoRepairDao.getDueRepairBywithoutreturnCompanyandpending();
    }

     @GetMapping(value = "/duerepair/getusedItemsbyDueRepairs/{id}", produces = "application/json")
    public List<UsedItems> findUsedItems(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return duetoRepairDao.getUsedItemsByDue(id);
    }

     @GetMapping(value = "/duerepair/getdiagnoseditemsbyrepairid/{id}", produces = "application/json")
    public List<DiagnosedItems> findDiagnoseItems(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return duetoRepairDao.getDiagnoseItemsByDue(id);
    }

    @PutMapping(value = "/duerepair/{id}")
    public String update(@PathVariable Integer id,@RequestBody DuetoRepair duetoRepair) {
        DuetoRepair extduetoRepair = duetoRepairDao.getReferenceById(id);
        System.out.println("ss");
        System.out.println(duetoRepair);

        try {
            BigDecimal total = BigDecimal.ZERO;
            // updateRepair.setUsedItems(duetoRepair.getUsedItems());
            if (duetoRepair.getDiagnosedItems() != null) {
                
                for (DiagnosedItems diagnosedItems : duetoRepair.getDiagnosedItems()) {
                    DiagnosedItems diagnosticItems = new DiagnosedItems();
                    diagnosticItems.setDue_to_repairitem_id(extduetoRepair);
                    diagnosticItems.setItemname(diagnosedItems.getItemname());
                    diagnosticItems.setCategory(diagnosedItems.getCategory());
                    diagnosticItems.setUnitprice(diagnosedItems.getUnitprice());
                    diagnosedItemsDao.save(diagnosticItems);
                    
                }
                extduetoRepair.setCharges(new BigDecimal("400.00") );
                extduetoRepair.setTotal(total.add(new BigDecimal("400.00")));
            }
            if (duetoRepair.getUsedItems() != null) {
                
                for (UsedItems usedItems2 : duetoRepair.getUsedItems()) {
                    //  usedItems2.setDue_to_repairitem_id(duetoRepair);
                    extduetoRepair.setTotal(new BigDecimal(1000));
                     if (usedItems2.getUnitprice() != null) {
                         total = total.add(usedItems2.getUnitprice());
                        
                     }
                    UsedItems used = new UsedItems();
                    used.setDue_to_repairitem_id(duetoRepair);
                    used.setCategory(usedItems2.getCategory());
                    used.setItemname(usedItems2.getItemname());
                    usedItemDao.save(used);
                    
                }
            }
            extduetoRepair.setStatusofrepair(duetoRepair.getStatusofrepair());

            // extduetoRepair.setCharges(new BigDecimal("400.00") );
            // extduetoRepair.setCharges(new BigDecimal("0") );

            // duetoRepair.setRepair_id(repairDao.getReferenceById(duetoRepair.getRepairid()));

            // extduetoRepair.setTotal(total.add(new BigDecimal("400.00")));
            // extduetoRepair.setTotal(total);
            duetoRepairDao.save(extduetoRepair);
            return "OK";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
       
    }
}
