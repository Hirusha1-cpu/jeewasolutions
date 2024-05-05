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
import jakarta.transaction.Transactional;
import lk.example.jeewacomputers.customer.dao.CustomerDao;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.sales.dao.InvoiceDao;
import lk.example.jeewacomputers.sales.entity.Invoice;
import lk.example.jeewacomputers.sales.entity.SalesHasSerial;
import lk.example.jeewacomputers.sales.entity.SerialNoList;

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
    // @Transactional
    public String save(@RequestBody Invoice invoice) {

        try {
            // List<SalesHasSerial> salesHasSerials = invoice.getSalesHasSerials();
            System.out.println(invoice);
            if (invoice.getSalesHasSerials() != null) {
                for (SalesHasSerial salesHasSerial : invoice.getSalesHasSerials()) {
                    salesHasSerial.setSales_id(invoice);
                    //set the warrenty start date for today date
                    // salesHasSerial.setWarrentystartdate(LocalDateTime.now());
                    //invoice eken serialnolist ekak pass krnwa eka assign kragnnwa one to many, serial no list ekata
                    List<SerialNoList> serialNos = invoice.getSerialnolist_id();
                    //String[] serialNoArray = serialNos;
                    for (SerialNoList serialNoList : serialNos) {
                        //get the serial number from list passed from frontend
                        String serialno = serialNoList.getSerialno();
                        //set serial number object from dao using query that gain object by object
                        salesHasSerial.setSerialno_id(invoiceDao.getItemBySerialNo(serialno));
                        //get the warrenty period that passed from frontend 
                        // Integer warrentyPeriod = serialNoList.getWarrentyperiod();
                        //set the warrenty period to the salesHasSerial entity
                        // salesHasSerial.setWarrentyperiod(warrentyPeriod);
                        //calculate the warrenty expire date
                        // LocalDateTime warrentyExpireDate = salesHasSerial.getWarrentystartdate().plusDays(warrentyPeriod);
                        //set warrenty expire date to salesHasSerial
                        // salesHasSerial.setWarrentyexpire(warrentyExpireDate);
                        //serialNoList eke salesid ekata invoice eka set kranwa
                        serialNoList.setSales_id(invoice);
    
                        System.out.println(serialno);
                    }
                    // // salesHasSerial.setSerialno_id(invoice);
                    // Integer id = serialNoDao.getIdOfSerialNo(invoice.getItemserialno());
                    // Optional<SerialNo> sn = serialNoDao.findById(id);
                    // System.out.println(sn);
                    // salesHasSerial.setSerialno_id(sn);
                }
            }else{
                System.out.println("No SalesHasSerial entries found for this invoice.");

            }
            //customer entity ekata set krnwa customer attribute tika
            // customer.setName(invoice.getCustomer_id().getName());
            // customer.setPhone(invoice.getCustomer_id().getPhone());
            // customer.setCustomercode(invoice.getCustomer_id().getCustomercode());
            // customer.setBuymode(invoice.getCustomer_id().getBuymode());
            // customer.setBuyrounds(invoice.getCustomer_id().getBuyrounds());
            // //invoice eke customer id eakata customer set karanwa
            // invoice.setCustomer_id(customer);
            // customerdao.save(customer);
            invoiceDao.save(invoice);
            System.out.println(invoice);

            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

}
