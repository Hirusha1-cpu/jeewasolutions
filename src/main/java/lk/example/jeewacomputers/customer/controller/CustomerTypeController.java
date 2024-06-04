package lk.example.jeewacomputers.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.dao.CustomerTypeDao;
import lk.example.jeewacomputers.customer.entity.CustomerType;

@RestController
public class CustomerTypeController {
    @Autowired
    private CustomerTypeDao customerTypeDao;

    @Autowired
    private CustomerDao customerDao;

    @GetMapping(value = "/customertype/getlist", produces = "application/json")
    public List<CustomerType> findAll() {
        // login user authentication and authorization
        // Sort.by(Direction.DESC, "id")
        return customerTypeDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/customertype/getlist/{custype}", produces = "application/json")
    public CustomerType findCusType(@PathVariable("custype") String custype) {
        // login user authentication and authorization
        return customerTypeDao.getCusTypeDetails(custype);
    }

    @PutMapping(value = "/customertype")
    public String postMethodName(@RequestBody CustomerType custype) {
        try {
            String custypename = custype.getCustomertypes();
            CustomerType customerType = customerTypeDao.getCusTypeDetails(custypename);
            customerType.setBuyrounds(custype.getBuyrounds());
            customerType.setDiscount(custype.getDiscount());
            customerType.setMincash(custype.getMincash());
            customerTypeDao.save(customerType);
            return "OK";
            
        } catch (Exception e) {
            return "save Not Completed" + e.getMessage();

        }
    }
    





}
