package lk.example.jeewacomputers.purchase.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.purchase.dao.PurchaseOrderRequestDao;
import lk.example.jeewacomputers.purchase.entity.PurchaseOrderRequest;
import lk.example.jeewacomputers.suppliers.entity.Supplier;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class PurchaseOrderRequestController {
    @Autowired
    private PurchaseOrderRequestDao dao;

    @GetMapping(value = "/purchaseorderrequest/getlist", produces = "application/json")
    public List<PurchaseOrderRequest> findAllData() {
        // login user authentication and authorization
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // HashMap<String, Boolean> logSupplierPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Supplier");

        // System.out.println(auth.getName());
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }


    @PostMapping("/purchaseorderrequest")
    public String save(@RequestBody PurchaseOrderRequest pOrderRequest) {
      
        
        dao.save(pOrderRequest);
        return "OK";
    }
    
}
