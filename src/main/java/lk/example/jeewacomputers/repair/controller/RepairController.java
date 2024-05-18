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

import java.util.*;

import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lk.example.jeewacomputers.repair.dao.RepairDao;
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
            customerdao.save(newCustomer);
            Customer existingcs = customerdao.getCustomerByPhone(repair.getCustomer_id().getPhone());
            repair.setCustomer_id(existingcs);
       
            for (UsedItems usedItems : repair.getUsedItems()) {
                // purchaseHasCategory.setPurchase_id(purchase);
                usedItems.setRepair_id(repair);
            }
            for (DuetoRepair duetoRepair : repair.getDuetoRepair()) {
                // purchaseHasCategory.setPurchase_id(purchase);
                duetoRepair.setRepair_id(repair);
            }
            IncomePayment existingIncomePayment = repair.getIncomePayments();
            if (existingIncomePayment != null) {
                existingIncomePayment.setRepair_id(repair);
                
            }

            repairDao.save(repair);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

    @PutMapping(value = "/repair/{id}")
    // @Transactional
    public Repair saveUpdate(@PathVariable Integer id,@RequestBody Repair repair) {
        Repair exRepair = repairDao.getRepairById(id);
        // exRepair.setUsedItems(repair.getUsedItems());
        exRepair.setTechnicalnote(repair.getTechnicalnote());
        exRepair.setRepairstatus(repair.getRepairstatus());
        Repair repair2 =  repairDao.save(exRepair);
        return repair2;
    }


}
