package lk.example.jeewacomputers.payment.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.payment.entity.ExpensePayment;

public interface ExpensePaymentDao extends JpaRepository<ExpensePayment, Integer> {
    @Query(value = "SELECT * FROM jeewacomputersproject.grn where grnno = ?1", nativeQuery = true)
    public String getGrnByGrnNo(String grnno);
}
