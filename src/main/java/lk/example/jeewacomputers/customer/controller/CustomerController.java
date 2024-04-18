package lk.example.jeewacomputers.customer.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CustomerController {
    
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
