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
import lk.example.jeewacomputers.repair.dao.UsedItemDao;
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
    @Autowired
    private UsedItemDao usedItemDao;

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

     @GetMapping(value = "/duerepair/getusedItemsbyDueRepairs/{id}", produces = "application/json")
    public List<UsedItems> findUsedItems(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return duetoRepairDao.getUsedItemsByDue(id);
    }

    @PutMapping(value = "/duerepair/{id}")
    public String update(@PathVariable Integer id,@RequestBody DuetoRepair duetoRepair) {
        // DuetoRepair extduetoRepair = duetoRepairDao.getReferenceById(id);
        System.out.println("ss");
        System.out.println(duetoRepair);
        try {
            for (UsedItems usedItems2 : duetoRepair.getUsedItems()) {
                 usedItems2.setDue_to_repairitem_id(duetoRepair);
                // UsedItems used = new UsedItems();
                // used.setDue_to_repairitem_id(duetoRepair);
                // used.setCategory(usedItems2.getCategory());
                // used.setItemname(usedItems2.getItemname());
                // usedItemDao.save(used);
                
            }
         duetoRepair.setRepair_id(repairDao.getReferenceById(duetoRepair.getRepairid()));
     
            duetoRepairDao.save(duetoRepair);
            return "OK";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
       
    }
}
