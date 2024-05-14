package lk.example.jeewacomputers.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.data.domain.Sort.Direction;
import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;

import java.util.*;

@RestController
public class CustomerController {
    @Autowired
    private CustomerDao customerDao;

    @GetMapping(value = "/customer/getlist", produces = "application/json")
    public List<Customer> findAll() {
        // login user authentication and authorization
        // Sort.by(Direction.DESC, "id")
        return customerDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    
     @RequestMapping(value = "/customer")
    public ModelAndView customerUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Customer");
        viewEmp.addObject("title", "Customer Management - BIT Project 2024");
        viewEmp.setViewName("customer/customerDetail.html");
        return viewEmp;
    }
}
