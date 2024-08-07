package lk.example.jeewacomputers.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.data.domain.Sort.Direction;
import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.customer.entity.CustomerType;
import lk.example.jeewacomputers.repair.entity.Repair;
import lk.example.jeewacomputers.report.entity.ReportCategoryViseCount;

import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
    @GetMapping(value = "/customer/getlist/{id}", produces = "application/json")
    public Customer findbyCustomerid(@PathVariable("id") Integer id) {
        return customerDao.getReferenceById(id);
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

    @GetMapping(value = "/customer/getdiscount/{name}", produces = "application/json")
    public CustomerType getCustomerType(@PathVariable("name") String name) {
        return customerDao.getCustomerTypeByName(name);
    }

    @GetMapping(value = "/customer/getdiscountbyphone/{phone}", produces = "application/json")
    public CustomerType getCustomerTypeByPhone(@PathVariable("phone") String phone) {
        return customerDao.getCustomerTypeByPhone(phone);
    }

    @GetMapping(value = "/customer/getcustomertypebyphoneandname", params = { "name", "phone" }, produces = "application/json")
    public CustomerType findExistCustomerType(@RequestParam("name") String name, @RequestParam("phone") String phone) {
        // login user authentication and authorization
        return customerDao.getCustomerTypeByPhoneandName(name, phone);
    }

    @GetMapping(value = "/customer/getcustomerbytype/{name}", produces = "application/json")
    public List<Customer> getCustomerByType(@PathVariable("name") String name) {
        return customerDao.getCustomersByCustomerType(name);
    }

     @GetMapping(value = "/customer/getexistingcustomer", params = { "name", "phone" }, produces = "application/json")
    public Customer findExistCustomer(@RequestParam("name") String name, @RequestParam("phone") String phone) {
        // login user authentication and authorization
        return customerDao.getExistCustomer(name, phone);
    }

     @GetMapping(value = "/customer/getexistingcustomerbyphone", params = { "phone" }, produces = "application/json")
    public Customer findExistCustomerByPhone(@RequestParam("phone") String phone) {
        // login user authentication and authorization
        return customerDao.getCustomerByPhone(phone);
    }

     @GetMapping(value = "/customer/getexistingcustomerbyname", params = { "name" }, produces = "application/json")
    public Customer findExistCustomerByName(@RequestParam("name") String name) {
        // login user authentication and authorization
        return customerDao.getCustomerByName(name);
    }



    @GetMapping(value = "/customer/count/{name}", produces = "application/json")
    public Integer getCustomerCount(@PathVariable("name") String name) {
        return customerDao.getCustomerCount(name);
    }


    @PostMapping(value = "/customer")
    public String postMethodName(@RequestBody Customer customer) {
        try {
            customerDao.save(customer);
            return "OK";
            
        } catch (Exception e) {
            return "save Not Completed" + e.getMessage();

        }
    }
    






}
