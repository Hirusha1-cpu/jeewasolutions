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

import lk.example.jeewacomputers.repair.dao.DuetoRepairDao;
import lk.example.jeewacomputers.repair.dao.RepairDao;
import lk.example.jeewacomputers.repair.entity.DuetoRepair;
import lk.example.jeewacomputers.repair.entity.Repair;
import lk.example.jeewacomputers.repair.entity.UsedItems;
import java.util.*;

@RestController
public class DuetoRepairController {
    @Autowired
    private DuetoRepairDao duetoRepairDao;
    @Autowired
    private RepairDao repairDao;

    @GetMapping(value = "/duerepair/getlist", produces = "application/json")
    public List<DuetoRepair> findAlls() {
        // login user authentication and authorization
        return duetoRepairDao.findAll(Sort.by(Direction.DESC, "id"));
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

    @PutMapping(value = "/duerepair")
    public String update(@RequestBody DuetoRepair duetoRepair) {

        System.out.println("ss");
        System.out.println(duetoRepair);
        try {
            for (UsedItems usedItems2 : duetoRepair.getUsedItems()) {
                // purchaseHasCategory.setPurchase_id(purchase);
                usedItems2.setDue_to_repairitem_id(duetoRepair);
            }
         duetoRepair.setRepair_id(repairDao.getReferenceById(duetoRepair.getRepairid()));
     
            duetoRepairDao.save(duetoRepair);
            return "OK";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
       
    }
}
