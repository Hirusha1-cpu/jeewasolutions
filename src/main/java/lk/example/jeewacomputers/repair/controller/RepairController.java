package lk.example.jeewacomputers.repair.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;

import java.util.*;

import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lk.example.jeewacomputers.repair.dao.DuetoRepairDao;
import lk.example.jeewacomputers.repair.dao.RepairDao;
import lk.example.jeewacomputers.repair.dao.UsedItemDao;
import lk.example.jeewacomputers.repair.entity.DuetoRepair;
import lk.example.jeewacomputers.repair.entity.Repair;
import lk.example.jeewacomputers.repair.entity.UsedItems;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
public class RepairController {

    @Autowired
    private RepairDao repairDao;

    @Autowired
    private SerialNoDao serialNoDao;

    @Autowired
    private DuetoRepairDao duetoRepairDao;

    @Autowired
    private CustomerDao customerdao;

    @GetMapping(value = "/repair/getlist", produces = "application/json")
    public List<Repair> findAlls() {
        // login user authentication and authorization
        return repairDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/repair/getlist/{id}", produces = "application/json")
    public Repair findRepair(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return repairDao.getRepairById(id);
    }

    @GetMapping(value = "/repair/getrepairbycustomer/{name}", produces = "application/json")
    public List<Repair> findRepairByName(@PathVariable("name") String name) {
        // login user authentication and authorization
        return repairDao.getRepairByCustomerName(name);
    }

    @RequestMapping(value = "/repair")
    public ModelAndView repairUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewRepair = new ModelAndView();
        viewRepair.addObject("logusername", auth.getName());
        viewRepair.addObject("modulename", "Repair");
        viewRepair.addObject("title", "Repair Management - BIT Project 2024");
        viewRepair.setViewName("repair/repair.html");
        return viewRepair;
    }

    @PostMapping(value = "/repair")
    // @Transactional
    public String save(@RequestBody Repair repair) {

        try {

            Customer newCustomer = new Customer();
            newCustomer.setName(repair.getCustomer_id().getName());
            newCustomer.setPhone(repair.getCustomer_id().getPhone());
            Customer existingc = customerdao.getCustomerByPhone(repair.getCustomer_id().getPhone());
            if (existingc == null) {
                customerdao.save(newCustomer);
                Customer existingcs = customerdao.getCustomerByPhone(repair.getCustomer_id().getPhone());
                existingcs.setRepairs(1);
                existingcs.setCustomerType(customerdao.getNormalBuyRounds());
                repair.setCustomer_id(existingcs);
            } else {
                System.out.println(repair.getCustomer_id().getPhone());
                if (existingc.getRepairs() == null) {
                    existingc.setRepairs(1);
                    existingc.setCustomerType(customerdao.getNormalBuyRounds());
                } else {
                    existingc.setRepairs(existingc.getRepairs() + 1);
                    if ((existingc.getRepairs() + 1) > customerdao.getPremiumBuyRounds().getBuyrounds()) {
                        existingc.setCustomerType(customerdao.getPremiumBuyRounds());
                    } else if ((existingc.getRepairs() + 1) > customerdao.getFirstStageBuyRounds().getBuyrounds()) {
                        existingc.setCustomerType(customerdao.getPremiumBuyRounds());
                    } else if ((existingc.getRepairs() + 1) > customerdao.getSecondStageBuyRounds().getBuyrounds()) {
                        existingc.setCustomerType(customerdao.getPremiumBuyRounds());
                    } else {
                        existingc.setCustomerType(customerdao.getNormalBuyRounds());
                    }
                }
                customerdao.save(existingc);
                repair.setCustomer_id(existingc);
            }
            int k = 1;
            for (DuetoRepair duetoRepair : repair.getDuetoRepair()) {
                for (UsedItems usedItems : duetoRepair.getUsedItems()) {
                    // purchaseHasCategory.setPurchase_id(purchase);
                    usedItems.setDue_to_repairitem_id(duetoRepair);

                }
                // purchaseHasCategory.setPurchase_id(purchase);
                String s = duetoRepairDao.getExistItemBarcode(duetoRepairDao.getItemBarcode(duetoRepairDao.getMaxId()));
                System.out.println(s);
                if (s == null) {
                    duetoRepair.setBarcode("brcode00001" + 01);
                }
                String newBarcode = duetoRepairDao.getItemBarcode(k);
                duetoRepair.setBarcode(newBarcode);
                duetoRepair.setTakendate(LocalDateTime.now().toLocalDate());;
                k++;
                duetoRepair.setRepairid(repairDao.getMaxRepairId());
                duetoRepair.setRepair_id(repair);
                duetoRepair.setStatusofrepair("pending diagnosis");
            }
            IncomePayment existingIncomePayment = repair.getIncomePayments();
            if (existingIncomePayment != null) {
                existingIncomePayment.setRepair_id(repair);

            }

            repair.setRepairstatus("pending diagnosis");
            repairDao.save(repair);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

    @PutMapping(value = "/repair/{id}")
    // @Transactional
    public Repair saveUpdate(@PathVariable Integer id, @RequestBody Repair repair) {
        Repair exRepair = repairDao.getRepairById(id);
        // exRepair.setTechnicalnote(repair.getTechnicalnote());
        exRepair.setRepairstatus(repair.getRepairstatus());

        List<DuetoRepair> dueToRepairInRepair = repair.getDuetoRepair();
        exRepair.setDuetoRepair(dueToRepairInRepair);

        for (DuetoRepair duetoRepair : repair.getDuetoRepair()) {
            DuetoRepair duetoRepairnew = new DuetoRepair();
            duetoRepairnew.setStatusofrepair(duetoRepair.getStatusofrepair());
            duetoRepair.setRepair_id(exRepair);
            duetoRepairDao.save(duetoRepairnew);

            List<UsedItems> usedItems = duetoRepair.getUsedItems();
            duetoRepair.setUsedItems(usedItems);

            for (UsedItems usedItems2 : duetoRepair.getUsedItems()) {
                // purchaseHasCategory.setPurchase_id(purchase);
                usedItems2.setDue_to_repairitem_id(duetoRepair);
            }
            // duetoRepair.setStatusofrepair("Diagnosed");
        }
        IncomePayment incomePayment = repair.getIncomePayments();
        incomePayment.setRepair_id(exRepair);
        exRepair.setIncomePayments(repair.getIncomePayments());

        Repair repair2 = repairDao.save(exRepair);
        return repair2;
    }

}
