package lk.example.jeewacomputers.payment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.payment.dao.IncomePaymentDao;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lk.example.jeewacomputers.payment.entity.IncomePaymentNew;
import lk.example.jeewacomputers.payment.entity.IncomePaymentsCustomer;
import lk.example.jeewacomputers.privilege.controller.PrivilegeController;
import lk.example.jeewacomputers.report.entity.ReportCategoryViseCount;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class IncomePayementController {
    @Autowired
    // create dao object
    private UserDao dao;

    @Autowired
    // create dao object
    private EmployeeDao empDao;
    
     @Autowired
    private IncomePaymentDao incomePaymentDao;


    @Autowired
    private PrivilegeController privilegeController;

     @GetMapping(value = "/income/getlist", produces = "application/json")
    public List<IncomePayment> findAll() {
        // login user authentication and authorization
        return incomePaymentDao.findAll(Sort.by(Direction.DESC, "id"));
    }

     @GetMapping(value = "/income/cusvisegetlist", produces = "application/json")
    public List<IncomePaymentsCustomer> findCusomerVisePayments() {
        // login user authentication and authorization
        String[][] queryDataList = incomePaymentDao.getCustomerViseIncome();
        List<IncomePaymentsCustomer> result = new ArrayList<>();
        for (String[] reportCategoryViseCount : queryDataList) {
            IncomePaymentsCustomer reportCategoryViseCount2 = new IncomePaymentsCustomer();
            reportCategoryViseCount2.setInvoiceno(reportCategoryViseCount[0]);
            reportCategoryViseCount2.setDate(reportCategoryViseCount[1]);
            reportCategoryViseCount2.setCustomer(reportCategoryViseCount[2]);
            reportCategoryViseCount2.setTotal(reportCategoryViseCount[3]);

            result.add(reportCategoryViseCount2);
        }
        result.sort((a, b) -> Long.compare(Long.parseLong(b.getInvoiceno()), Long.parseLong(a.getInvoiceno())));

        return result;
    }

     @GetMapping(value = "/income/cusvisegetlistanditems", produces = "application/json")
    public List<IncomePaymentNew> findCusomerVisePaymentsandItems() {
        // login user authentication and authorization
        String[][] queryDataList = incomePaymentDao.getCustomerViseIncomeAndItems();
        List<IncomePaymentNew> result = new ArrayList<>();
        for (String[] reportCategoryViseCount : queryDataList) {
            IncomePaymentNew reportCategoryViseCount2 = new IncomePaymentNew();
            reportCategoryViseCount2.setInvoiceno(reportCategoryViseCount[0]);
            reportCategoryViseCount2.setDate(reportCategoryViseCount[1]);
            reportCategoryViseCount2.setCustomer(reportCategoryViseCount[2]);
            reportCategoryViseCount2.setSerialno(reportCategoryViseCount[3]);
            reportCategoryViseCount2.setTotal(reportCategoryViseCount[4]);

            result.add(reportCategoryViseCount2);
        }
        result.sort((a, b) -> Long.compare(Long.parseLong(b.getInvoiceno()), Long.parseLong(a.getInvoiceno())));

        return result;
    }

     @RequestMapping(value = "/income")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Income");
        User user = dao.getUserByUsername(auth.getName());
        // GraphicCard graphicCard = graphicCardDao.getGraphicByName("ASUS DUAL TTX");
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("loguserrole", user.getRoles().iterator().next().getName());
        // viewEmp.addObject("loguserphoto", graphicCard.getGraphic_photo());
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Payments");

        if ((logUserPrivi.get("select")) && (empDao.getStatusOfEmployee("Deleted", auth.getName()) == null)) {

            viewEmp.addObject("title", "Payment Management - BIT Project 2024");

            viewEmp.setViewName("invoice/payment.html");
            return viewEmp;
            // return "User Save Not Completed: You Haven't Permission";
        } else {

            viewEmp.addObject("title", "Error Permission - BIT Project");

            viewEmp.setViewName("error/error.html");
            return viewEmp;
        }
    }

}
