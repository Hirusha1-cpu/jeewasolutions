package lk.example.jeewacomputers.sales.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.sales.entity.Invoice;

public interface InvoiceDao extends JpaRepository<Invoice, Integer>{
    @Query(value = "select s from SerialNo s where s.serialno = ?1")
    public SerialNo getItemBySerialNo(String serialno);

    @Query(value ="SELECT name FROM jeewacomputersproject.serialno sn JOIN jeewacomputersproject.category c ON sn.category_id = c.id where serialno = ?1",nativeQuery = true)
    public String getCategoryName(String serialno);

    @Query(value ="SELECT name,phone FROM jeewacomputersproject.customer where id in (SELECT customer_id FROM jeewacomputersproject.sales where id in(SELECT sales_id FROM jeewacomputersproject.sales_has_serialno where serialno_id = (SELECT id from jeewacomputersproject.serialno where serialno = ?1)))",nativeQuery = true)
    public String getCustomerNameBySerialNo(String serialno);

    // SELECT * FROM jeewacomputersproject.customer where id in (SELECT customer_id FROM jeewacomputersproject.sales where id in(SELECT sales_id FROM jeewacomputersproject.sales_has_serialno where serialno_id = (SELECT id from jeewacomputersproject.serialno where serialno = "1111")));
    // @Query(value ="select warrenty from ?1")
    // public Integer getWarrenty(String category);

    
    
} 
