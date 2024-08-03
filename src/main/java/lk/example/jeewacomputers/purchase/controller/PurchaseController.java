package lk.example.jeewacomputers.purchase.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.zxing.FormatException;
import com.google.zxing.NotFoundException;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lk.example.jeewacomputers.purchase.dao.PurchaseDao;
import lk.example.jeewacomputers.purchase.entity.Purchase;
import lk.example.jeewacomputers.purchase.entity.PurchaseHasCategory;
import lk.example.jeewacomputers.service.BarCodeGenerator;


@RestController
public class PurchaseController {
    @Autowired
    private PurchaseDao dao;

        @Autowired
    private BarCodeGenerator barcodeGenerator; // Inject the BarcodeGenerator service

    @PersistenceContext
    private EntityManager entityManager;
    // It acts as a bridge between your Java application and the underlying
    // relational database

    // create get mapping for get supplier all data --- [/supplier/findall]
    @GetMapping(value = "/purchase/getlist", produces = "application/json")
    public List<Purchase> findAllData() {
        // login user authentication and authorization
        // barcodeGenerator.readQRCode("/Users/hirushafernando/Documents/Project_BIT/PROJECT/jeewa_main/Ui_Structures-QRCODE.png");       
        return dao.findAll(Sort.by(Direction.DESC, "id"));

    }

    @GetMapping(value = "/purchase/getporeds", produces = "application/json")
    public List<Purchase> findPOrdrers() {
        // login user authentication and authorization
        return dao.getPurchaseOrdersNotInGRN();
    }

    @GetMapping(value = "/purchase/getpurchasesupplier/{supplier_id}", produces = "application/json")
    public List<Purchase> findPurchaseBySupplier(@PathVariable("supplier_id") Integer supplier_id) {
        // login user authentication and authorization
        return dao.getPurchaseOrdersBySupplier(supplier_id);
    }

    @GetMapping(value = "/purchase/purchaseoredrs/{id}", produces = "application/json")
    public Purchase findPurchaseOrders(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return dao.getPurchaseOrdersWithCode(id);
    }

    // load the employee ui file using requesting this url (/employee)
    @RequestMapping(value = "/purchase")
    public ModelAndView privilegeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Purchase");
        viewEmp.addObject("title", "Purchase Management - BIT Project 2024");
        viewEmp.setViewName("purchase/purchase.html");
        return viewEmp;
    }

    @PostMapping(value = "/purchase")
    @Transactional
    public String save(@RequestBody Purchase purchase) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        try {
            // set auto generated value
            // Supplier supplier = entityManager.find(Supplier.class, 2); // Assuming
            // supplier ID is 1

            for (PurchaseHasCategory purchaseHasCategory : purchase.getPurchaseHasCategory()) {
                purchaseHasCategory.setPurchase_id(purchase);
            }

            // extPur.setSupplier_id(sup);
            purchase.setPurchasestatus_id(dao.getPurchaseStatus("pending"));
            purchase.setAddeduser_id(dao.getUsersByUsername(auth.getName()));
            purchase.setPurchase_code(dao.getPurchaseCode());
            purchase.setNote("hhh");
            purchase.setAdded_datetime(LocalDateTime.now().toLocalDate());
            // purchase.setSupplier_id(supplier);
            // extPur.setPurchasestatus_id();
            // oparation
            dao.save(purchase);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }
}
