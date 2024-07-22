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

import java.time.LocalDateTime;

import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lk.example.jeewacomputers.sales.dao.InvoiceDao;
import lk.example.jeewacomputers.sales.entity.Invoice;
import lk.example.jeewacomputers.sales.entity.SalesHasDue;
import lk.example.jeewacomputers.sales.entity.SalesHasSerial;
// import lk.example.jeewacomputers.sales.entity.SerialNoList;

import java.util.*;

@RestController
public class InvoiceController {
    @Autowired
    private SerialNoDao serialNoDao;

    @Autowired
    private InvoiceDao invoiceDao;

    @Autowired
    private CustomerDao customerdao;

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

    @GetMapping(value = "/invoice/getlisted/{id}", produces = "application/json")
    public Invoice findItemAlls(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return invoiceDao.getReferenceById(id);
    }

    @GetMapping(value = "/invoice/getcustomer/{serialno}", produces = "application/json")
    public String findCustomer(@PathVariable("serialno") String serialno) {
        // login user authentication and authorization
        return invoiceDao.getCustomerNameBySerialNo(serialno);
    }

    @PostMapping(value = "/invoice")
    // @Transactional
    public Invoice save(@RequestBody Invoice invoice) {

        try {
            invoice.setInvoiceno(invoiceDao.generateInvoiceNo());
            invoice.setDatetime(LocalDateTime.now().toLocalDate());
            Customer newCustomer = new Customer();
            newCustomer.setName(invoice.getCustomer_id().getName());
            newCustomer.setPhone(invoice.getCustomer_id().getPhone());
            // customerdao.save(newCustomer);
            Customer existingcs = customerdao.getCustomerByPhone(invoice.getCustomer_id().getPhone());
            System.out.println(invoice);

            if (existingcs == null) {
                System.out.println("executed");
                customerdao.save(newCustomer);
                Customer existingcs1 = customerdao.getCustomerByPhone(invoice.getCustomer_id().getPhone());

                existingcs1.setBuyrounds(1);
                existingcs1.setCustomerType(customerdao.getNormalBuyRounds());
                invoice.setCustomer_id(existingcs1);
                System.out.println("executed-1");
            } else {
                // Customer existingcs1 =
                // customerdao.getCustomerByPhone(invoice.getCustomer_id().getPhone());

                System.out.println("executed-2");
                existingcs.setBuyrounds(existingcs.getBuyrounds() + 1);
                existingcs.setCustomerType(null);
                if ((existingcs.getBuyrounds() + 1) > customerdao.getPremiumBuyRounds().getBuyrounds()) {
                    existingcs.setCustomerType(customerdao.getPremiumBuyRounds());
                } else if ((existingcs.getBuyrounds() + 1) > customerdao.getFirstStageBuyRounds().getBuyrounds()) {
                    existingcs.setCustomerType(customerdao.getFirstStageBuyRounds());
                } else if ((existingcs.getBuyrounds() + 1) > customerdao.getSecondStageBuyRounds().getBuyrounds()) {
                    existingcs.setCustomerType(customerdao.getSecondStageBuyRounds());
                } else {
                    existingcs.setCustomerType(customerdao.getNormalBuyRounds());
                }
                customerdao.save(existingcs);
                invoice.setCustomer_id(existingcs);
                System.out.println("executed-3");

            }

            // IncomePayment newIncomePayment = new IncomePayment();
            // newIncomePayment.setDate(LocalDate.now());
            // newIncomePayment.setInvoiceno(invoice.getInvoiceno());
            // newIncomePayment.setPayment(invoice.getTotal());
            // incomePaymentDao.save(newIncomePayment);

            // IncomePayment existingIncomePayment =
            // incomePaymentDao.getInvoicenoByIncomePayment(invoice.getInvoiceno());

            if (invoice.getSalesHasSerials() != null) {
                System.out.println("executed-4");
                for (SalesHasSerial salesHasSerial : invoice.getSalesHasSerials()) {
                    salesHasSerial.setSales_id(invoice);

                    SerialNo serialNo = salesHasSerial.getSerialno_id();
                    serialNo.setAvailability(Boolean.FALSE);
                    serialNoDao.save(serialNo);

                }

                System.out.println("executed-5");

            } else {
                System.out.println("No SalesHasSerial entries found for this invoice.");

            }
            if (invoice.getSalesHasDues() != null) {
                System.out.println("executed-4");
                for (SalesHasDue salesHasDue : invoice.getSalesHasDues()) {
                    salesHasDue.setSales_id(invoice);
    
                }
                // meke sale ekat ekka sale eke many to one ekak due ekata thye nm
                
                System.out.println("executed-5");

            } else {
                System.out.println("No SalesHasSerial entries found for this invoice.");

            }

            IncomePayment existingIncomePayment = invoice.getIncomePayments();
            existingIncomePayment.setSales_id(invoice);

            Invoice i = invoiceDao.save(invoice);

            return i;

        } catch (Exception e) {

            return null;
        }

    }

}
