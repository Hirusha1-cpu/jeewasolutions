package lk.example.jeewacomputers.suppliers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.suppliers.dao.SupplierBankDetailsDao;
import lk.example.jeewacomputers.suppliers.dao.SupplierDao;
import lk.example.jeewacomputers.suppliers.entity.Supplier;
import lk.example.jeewacomputers.suppliers.entity.SupplierBankDetails;


@RestController
public class SupplierBankDetailsController {
    @Autowired
    private SupplierBankDetailsDao dao;

    @Autowired
    private SupplierDao supDao; 

    @GetMapping(value = "/supplierbankdetails/getlist", produces = "application/json")
    public List<SupplierBankDetails> findAllData() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

     //save user
    @PostMapping(value = "/supplierbankdetails")
    public String saveUser(@RequestBody SupplierBankDetails supplierbankdetails) {

        try {   
            Supplier supplierB =  supDao.getReferenceById(supDao.getSupplierNo());
            supplierbankdetails.setSupplier_id(supplierB); // Assuming you have a constructor for Supplier taking ID
            dao.save(supplierbankdetails);
            return "OK";
        } catch (Exception e) {
            return "Save Not completed" + e.getMessage();
        }
    }
}
