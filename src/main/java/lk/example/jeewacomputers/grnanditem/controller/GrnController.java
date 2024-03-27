package lk.example.jeewacomputers.grnanditem.controller;

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

import jakarta.transaction.Transactional;
import lk.example.jeewacomputers.grnanditem.dao.GrnDao;
import lk.example.jeewacomputers.grnanditem.entity.Grn;
import lk.example.jeewacomputers.purchase.entity.Purchase;

@RestController
public class GrnController {
    @Autowired
    // create dao object
    private GrnDao dao;

    @GetMapping(value = "/grn/getlist", produces = "application/json")
    public List<Grn> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/grn/getlist/{purchase_id}", produces = "application/json")
    public List<Grn> findGrnAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/grn/purchaseoredrs/{purchase_id}", produces = "application/json")
    public List<Grn> findPurchaseOrders(@PathVariable("purchase_id") Integer purchase_id) {
        // login user authentication and authorization
        return dao.getPurchaseOrdersWithCode(purchase_id);
    }

    @RequestMapping(value = "/grn")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "GRN");
        viewEmp.addObject("title", "GRN Management - BIT Project 2024");
        viewEmp.setViewName("grn/grn.html");
        return viewEmp;
    }

    @PostMapping(value = "/grn")
    @Transactional
    public String save(@RequestBody Grn grn) {

        try {
            
            dao.save(grn);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

}
