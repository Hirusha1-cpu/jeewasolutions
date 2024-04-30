package lk.example.jeewacomputers.sales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.sales.dao.InvoiceDao;
import lk.example.jeewacomputers.sales.entity.Invoice;

import java.util.*;

@RestController
public class InvoiceController {
    
    @Autowired
    private InvoiceDao invoiceDao;

    @RequestMapping(value = "/invoice")
    public ModelAndView invoiceUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewInvoice = new ModelAndView();
        viewInvoice.addObject("logusername", auth.getName());
        viewInvoice.addObject("modulename", "Invoice");
        viewInvoice.addObject("title", "Invoice Management - BIT Project 2024");
        viewInvoice.setViewName("invoice/invoice.html");
        return viewInvoice;
    }
    
    @GetMapping(value = "/invoice/getlist", produces = "application/json")
    public List<Invoice> findAlls() {
        // login user authentication and authorization
        return invoiceDao.findAll(Sort.by(Direction.DESC, "id"));
    }



    

}
