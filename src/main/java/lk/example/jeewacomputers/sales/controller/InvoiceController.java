package lk.example.jeewacomputers.sales.controller;

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
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.sales.dao.InvoiceDao;
import lk.example.jeewacomputers.sales.entity.Invoice;
import lk.example.jeewacomputers.sales.entity.SalesHasSerial;

import java.util.*;

@RestController
public class InvoiceController {
    
    @Autowired
    private InvoiceDao invoiceDao;

    // @Autowired
    // private Customer customer;
    
    // @Autowired
    // private SerialNoDao serialNoDao;
    // @Autowired
    // private SalesHasSerial salesHasSerial;

    // @Autowired
    // private SerialNo serialNo;

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

    @GetMapping(value = "/invoice/getlist/{serialno}", produces = "application/json")
    public SerialNo findItemAll(@PathVariable("serialno") String serialno) {
        // login user authentication and authorization
        return invoiceDao.getItemBySerialNo(serialno);
    }

    @PostMapping(value = "/invoice")
    @Transactional
    public String save(@RequestBody Invoice invoice) {

        try {

            for (SalesHasSerial salesHasSerial : invoice.getSalesHasSerials()) {
                salesHasSerial.setSales_id(invoice);
                // salesHasSerial.setSerialno_id(invoice);
                // Integer id =  serialNoDao.getIdOfSerialNo(invoice.getItemserialno());
                // Optional<SerialNo> sn =  serialNoDao.findById(id);
                // System.out.println(sn);
                // salesHasSerial.setSerialno_id(sn);
            }
            invoiceDao.save(invoice);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }




    

}
