package lk.example.jeewacomputers.suppliers.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.transaction.Transactional;
import lk.example.jeewacomputers.privilege.controller.PrivilegeController;

import lk.example.jeewacomputers.suppliers.dao.SupplierDao;
import lk.example.jeewacomputers.suppliers.entity.Supplier;
import lk.example.jeewacomputers.suppliers.entity.SupplierBankDetails;
import lk.example.jeewacomputers.suppliers.entity.SupplierHasCategory;

@RestController
public class SupplierController {
    @Autowired
    // create dao object
    private SupplierDao dao;
    
    @Autowired
    private PrivilegeController privilegeController;

    // create get mapping for get supplier all data --- [/supplier/findall]
    @GetMapping(value = "/supplier/getlist", produces = "application/json")
    public List<Supplier> findAllData() {
        // login user authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getName());
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/supplier/namebycategory/{category_id}", produces = "application/json")
    public List<Supplier> getSupplierNameByCategory(@PathVariable("category_id") Integer category_id) {
        return dao.getSupplierNameFromCategory(category_id);
    }

    @RequestMapping(value = "/supplier")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Supplier");
        viewEmp.addObject("title", "Supplier Management - BIT Project 2024");

        viewEmp.setViewName("suppliers/supplier.html");
        return viewEmp;
    }

    // save user
    @PostMapping(value = "/supplier")
    @Transactional
    public String saveUser(@RequestBody Supplier supplier) {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "supplier");
                
        // if (!logUserPrivi.get("delete")) {
        //     return "Delete not completed you have not privilege";
        // }
        try {
            String nextEmpNo = dao.getSupplierCode();
            supplier.setSupplier_code(nextEmpNo);
            supplier.setSupplierstatus_id(dao.getSuppStatus("Active"));
            supplier.setUser_id(dao.getUsersByUsername(auth.getName()));
            //metanadi supplier has category ekatai bank details walatai supplier object eken data save wenwa for loop eka haraha
            for (SupplierHasCategory supplierHasCategory : supplier.getCategoriesBrandsWithSuppliers()) {
                supplierHasCategory.setSupplier_id(supplier);
            }
            for (SupplierBankDetails supplierHasBakDetails : supplier.getBankDetailsOfSuppliers()) {
                supplierHasBakDetails.setSupplier_id(supplier);
            }

            dao.save(supplier);
            return "OK";
        } catch (Exception e) {
            return "Save Not completed" + e.getMessage();
        }
    }
    @PutMapping(value = "/supplier")
    @Transactional
    public String updateUser(@RequestBody Supplier supplier) {
          // get user authentication object
          //supplier module ekata thyena permissions privilege check krla balanwa
          Authentication auth = SecurityContextHolder.getContext().getAuthentication();
          HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                  "supplier");
          // if (!logUserPrivi.get("delete")) {
          //     return "Delete not completed you have not privilege";
          // }
          try {
              String nextEmpNo = dao.getSupplierCode();
              supplier.setSupplier_code(nextEmpNo);
  
              // supplier.setUser_id(logedUser);
              // supplier.setSupplierstatus_id(1);
              //metanadi supplier has category ekatai bank details walatai supplier object eken data save wenwa for loop eka haraha
              for (SupplierHasCategory supplierHasCategory : supplier.getCategoriesBrandsWithSuppliers()) {
                  supplierHasCategory.setSupplier_id(supplier);
              }
              for (SupplierBankDetails supplierHasBakDetails : supplier.getBankDetailsOfSuppliers()) {
                  supplierHasBakDetails.setSupplier_id(supplier);
              }
  
              dao.save(supplier);
              return "OK";
          } catch (Exception e) {
              return "Save Not completed" + e.getMessage();
          }
    }

}
