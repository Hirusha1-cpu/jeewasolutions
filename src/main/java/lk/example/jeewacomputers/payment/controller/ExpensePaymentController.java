package lk.example.jeewacomputers.payment.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.grnanditem.entity.Grn;
import lk.example.jeewacomputers.payment.dao.ExpensePaymentDao;
import lk.example.jeewacomputers.payment.entity.ExpensePayment;
import lk.example.jeewacomputers.payment.entity.IncomePayment;

@RestController
public class ExpensePaymentController {
    @Autowired
    private ExpensePaymentDao expensePaymentDao;

       @GetMapping(value = "/expensepayment/getlist", produces = "application/json")
    public List<ExpensePayment> findAll() {
        // login user authentication and authorization
        return expensePaymentDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @PostMapping(value = "/expensepayment")
    public String save(@RequestBody ExpensePayment expensePayment) {
        expensePayment.setGrnpayemntdate(LocalDate.now());
        expensePaymentDao.getGrnByGrnNo(null);

        Grn grn = expensePayment.getGrn_id();
        expensePayment.setGrnno(grn.getGrnno());
        expensePayment.setGrnpayemntdate(LocalDate.now());
    
        expensePaymentDao.save(expensePayment);
        return "OK";
    }
}
