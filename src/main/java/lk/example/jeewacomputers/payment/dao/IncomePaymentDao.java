package lk.example.jeewacomputers.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import lk.example.jeewacomputers.payment.entity.IncomePayment;

public interface IncomePaymentDao extends JpaRepository<IncomePayment, Integer> {
    
    @Query(value ="SELECT * FROM jeewacomputersproject.incomepayment where invoiceno = ?1;",nativeQuery = true)
    public IncomePayment getInvoicenoByIncomePayment(String invoiceno);
    
    @Query(value ="SELECT s.invoiceno,i.date,s.customer_id,s.total FROM jeewacomputersproject.incomepayment as i inner join  jeewacomputersproject.sales as s on i.sales_id = s.id;",nativeQuery = true)
    String[][] getCustomerViseIncome();


}
