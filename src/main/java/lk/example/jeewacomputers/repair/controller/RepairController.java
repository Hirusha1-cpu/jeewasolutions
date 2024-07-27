package lk.example.jeewacomputers.repair.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.*;

import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.payment.dao.IncomePaymentDao;
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
    private IncomePaymentDao incomePaymentDao;

    @Autowired
    private SerialNoDao serialNoDao;

    @Autowired
    private DuetoRepairDao duetoRepairDao;

    @Autowired
    private CustomerDao customerdao;

    @Autowired
    private UsedItemDao usedItemDao;

    @GetMapping(value = "/repair/getlist", produces = "application/json")
    public List<Repair> findAlls() {
        // login user authentication and authorization
        return repairDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/repair/getlist/{id}", produces = "application/json")
    public Repair findRepair(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return repairDao.getReferenceById(id);
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
        System.out.println(repair);
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
                // for (UsedItems usedItems : duetoRepair.getUsedItems()) {
                // // purchaseHasCategory.setPurchase_id(purchase);
                // usedItems.setDue_to_repairitem_id(duetoRepair);

                // }
                // purchaseHasCategory.setPurchase_id(purchase);
                String s = duetoRepairDao.getExistItemBarcode(duetoRepairDao.getItemBarcode(duetoRepairDao.getMaxId()));
                System.out.println(s);
                duetoRepair.setBarcode("brcode00001");
                String newBarcode = duetoRepairDao.getItemBarcode(k);
                duetoRepair.setBarcode(newBarcode);
                duetoRepair.setTakendate(LocalDateTime.now().toLocalDate());
                // duetoRepair.setStatusofrepair("pending diagnosis");
                duetoRepair.setRepairid(repairDao.getMaxRepairId());
                duetoRepair.setRepair_id(repair);
                k++;
            }
            // IncomePayment existingIncomePayment = repair.getIncomePayments();
            // existingIncomePayment.setRepair_id(repair);
            // if (existingIncomePayment != null) {

            // }

            // String s =
            // repairDao.getExistItemBarcode(repairDao.getItemBarcode(repairDao.getMaxId()));
            // System.out.println(s);
            // if (s == null) {
            // repair.setRepairno("R00001");
            // }
            // String newRcode = repairDao.getItemBarcode(1);
            // repair.setRepairno(newRcode);

            // repair.setRepairstatus("pending diagnosis");
            repairDao.save(repair);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

    @PutMapping(value = "/repair/{id}")
    // @Transactional
    public String saveUpdate(@PathVariable Integer id, @RequestBody Repair exRepair1) {

        Repair existingRepair = repairDao.getReferenceById(id);

        try {

            BigDecimal total1 = BigDecimal.ZERO;
            BigDecimal charges = BigDecimal.ZERO;
            for (DuetoRepair duetoRepair : exRepair1.getDuetoRepair()) {
                // Find the existing DuetoRepair by id
                DuetoRepair existingDuetoRepair = duetoRepairDao.findById(duetoRepair.getId())
                        .orElseThrow(() -> new RuntimeException("DuetoRepair not found"));

                // Update the existing DuetoRepair
                existingDuetoRepair.setStatusofrepair("Completed");
                existingDuetoRepair.setTechnicalnote(duetoRepair.getTechnicalnote());

                if (duetoRepair.getTotal() != null) {
                    total1 = total1.add(duetoRepair.getTotal());
                }
                if (duetoRepair.getCharges() != null) {
                    charges = charges.add(duetoRepair.getCharges());
                }
                // Handle UsedItems
                if (duetoRepair.getUsedItems() != null) {
                    for (UsedItems newUsedItem : duetoRepair.getUsedItems()) {
                        if (newUsedItem.getId() == null) {
                            // This is a new UsedItem, so create and save it
                            UsedItems usedItem = new UsedItems();
                            usedItem.setDue_to_repairitem_id(existingDuetoRepair);
                            usedItem.setCategory(newUsedItem.getCategory());
                            usedItem.setSerialno(newUsedItem.getSerialno());
                            usedItem.setItemname(newUsedItem.getItemname());
                            usedItem.setUnitprice(newUsedItem.getUnitprice());
                            usedItemDao.save(usedItem);
                        }
                        // If the UsedItem has an id, it already exists, so we don't need to do anything
                    }
                }

            }
            // exRepair.setRepairstatus("Completed");
            existingRepair.setCharges(charges);
            existingRepair.setDuerepairtotal(total1);
            existingRepair.setRepairstatus(exRepair1.getRepairstatus());

            System.out.println("executed rep 1");
            // IncomePayment incomePayment = exRepair1.getIncomePayments();
            // incomePayment.setRepair_id(existingRepair);
            // incomePayment.setDate(LocalDateTime.now());
            // incomePaymentDao.save(incomePayment);
            
            // exRepair.setIncomePayments(repair.getIncomePayments());

            // repairDao.save(existingRepair);
            return "OK";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
