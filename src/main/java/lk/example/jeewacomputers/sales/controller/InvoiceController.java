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

import java.time.LocalDate;

import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.payment.dao.IncomePaymentDao;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lk.example.jeewacomputers.sales.dao.InvoiceDao;
import lk.example.jeewacomputers.sales.entity.Invoice;
import lk.example.jeewacomputers.sales.entity.SalesHasSerial;
// import lk.example.jeewacomputers.sales.entity.SerialNoList;

import java.util.*;

@RestController
public class InvoiceController {

    @Autowired
    private InvoiceDao invoiceDao;

    // @Autowired
    private Customer customer;

    @Autowired
    private CustomerDao customerdao;

    // @Autowired
    private IncomePayment incomePayment;

    // @Autowired
    private IncomePaymentDao incomePaymentDao;

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

    @GetMapping(value = "/invoice/getcustomer/{serialno}", produces = "application/json")
    public String findCustomer(@PathVariable("serialno") String serialno) {
        // login user authentication and authorization
        return invoiceDao.getCustomerNameBySerialNo(serialno);
    }

    @PostMapping(value = "/invoice")
    // @Transactional
    public String save(@RequestBody Invoice invoice) {

        try {
            System.out.println(invoice);
            invoice.setInvoiceno("11111");

            Customer newCustomer = new Customer();
            newCustomer.setName(invoice.getCustomer_id().getName());
            newCustomer.setPhone(invoice.getCustomer_id().getPhone());
            // customerdao.save(newCustomer);
            Customer existingcs = customerdao.getCustomerByPhone(invoice.getCustomer_id().getPhone());
            
            if (existingcs == null) {
                customerdao.save(newCustomer);
                Customer existingcs1 = customerdao.getCustomerByPhone(invoice.getCustomer_id().getPhone());

                existingcs1.setBuyrounds(1);
                invoice.setCustomer_id(existingcs1);

            } else {
                // Customer existingcs1 =
                // customerdao.getCustomerByPhone(invoice.getCustomer_id().getPhone());

                existingcs.setBuyrounds(existingcs.getBuyrounds() + 1);
                customerdao.save(existingcs);
                invoice.setCustomer_id(existingcs);

            }

            // IncomePayment newIncomePayment = new IncomePayment();
            // newIncomePayment.setDate(LocalDate.now());
            // newIncomePayment.setInvoiceno(invoice.getInvoiceno());
            // newIncomePayment.setPayment(invoice.getTotal());
            // incomePaymentDao.save(newIncomePayment);

            // IncomePayment existingIncomePayment =
            // incomePaymentDao.getInvoicenoByIncomePayment(invoice.getInvoiceno());

            if (invoice.getSalesHasSerials() != null) {
                for (SalesHasSerial salesHasSerial : invoice.getSalesHasSerials()) {
                    salesHasSerial.setSales_id(invoice);

                }

            } else {
                System.out.println("No SalesHasSerial entries found for this invoice.");

            }
            IncomePayment existingIncomePayment = invoice.getIncomePayments();
            existingIncomePayment.setSales_id(invoice);
            
            invoiceDao.save(invoice);

            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

}
