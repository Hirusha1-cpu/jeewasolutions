package lk.example.jeewacomputers.suppliers.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.privilege.controller.PrivilegeController;
import lk.example.jeewacomputers.privilege.dao.PrivilegeDao;
import lk.example.jeewacomputers.suppliers.dao.SupplierDao;
import lk.example.jeewacomputers.suppliers.entity.Supplier;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

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
        return dao.findAll(Sort.by(Direction.DESC, "id"));
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
    public String saveUser(@RequestBody Supplier supplier) {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "supplier");


        try {
            String nextEmpNo = dao.getSupplierCode();
            supplier.setSupplier_code(nextEmpNo);
            // supplier.setUser_id(logedUser);
            // supplier.setSupplierstatus_id(1);
            dao.save(supplier);
            return "OK";
        } catch (Exception e) {
            return "Save Not completed" + e.getMessage();
        }
    }

}
