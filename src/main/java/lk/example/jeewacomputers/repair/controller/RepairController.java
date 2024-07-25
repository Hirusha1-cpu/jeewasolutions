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
                if (s == null) {
                    duetoRepair.setBarcode("brcode00001" + 01);
                }
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

            // repair.setRepairstatus("pending diagnosis");
            repairDao.save(repair);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

    @PutMapping(value = "/repair")
    // @Transactional
    public String saveUpdate( @RequestBody Repair exRepair) {
        // Repair exRepair = repairDao.getRepairById(id);

        try {

            BigDecimal total1 = BigDecimal.ZERO;
            BigDecimal charges = BigDecimal.ZERO;
            for (DuetoRepair duetoRepair : exRepair.getDuetoRepair()) {
                // DuetoRepair duetoRepairnew = new DuetoRepair();
                duetoRepair.setRepair_id(exRepair);
                duetoRepair.setStatusofrepair("Completed");
                // duetoRepair.setTechnicalnote(duetoRepair.getTechnicalnote());
                // duetoRepairDao.save(duetoRepairnew);
                total1 = total1.add(duetoRepair.getTotal());
                charges = charges.add(duetoRepair.getCharges());

                for (UsedItems usedItems2 : duetoRepair.getUsedItems()) {

                    UsedItems used = new UsedItems();
                    used.setDue_to_repairitem_id(duetoRepair);
                    used.setCategory(usedItems2.getCategory());
                    used.setItemname(usedItems2.getItemname());
                    usedItemDao.save(used);

                }

            }
            // exRepair.setRepairstatus("Completed");
            exRepair.setCharges(charges);
            exRepair.setDuerepairtotal(total1);
            

            IncomePayment incomePayment = exRepair.getIncomePayments();
            incomePayment.setRepair_id(exRepair);
            incomePayment.setDate(LocalDateTime.now());
            incomePaymentDao.save(incomePayment);
            // exRepair.setIncomePayments(repair.getIncomePayments());

            repairDao.save(exRepair);
            return "ok";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
