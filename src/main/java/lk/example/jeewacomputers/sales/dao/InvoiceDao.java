package lk.example.jeewacomputers.sales.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.*;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.sales.entity.Invoice;

public interface InvoiceDao extends JpaRepository<Invoice, Integer>{
    @Query(value = "select s from SerialNo s where s.serialno = ?1")
    public SerialNo getItemBySerialNo(String serialno);

    @Query(value ="SELECT name FROM jeewacomputersproject.serialno sn JOIN jeewacomputersproject.category c ON sn.category_id = c.id where serialno = ?1",nativeQuery = true)
    public String getCategoryName(String serialno);

    @Query(value ="SELECT name,phone FROM jeewacomputersproject.customer where id in (SELECT customer_id FROM jeewacomputersproject.sales where id in(SELECT sales_id FROM jeewacomputersproject.sales_has_serialno where serialno_id in (SELECT id from jeewacomputersproject.serialno where serialno = ?1)))",nativeQuery = true)
    public String getCustomerNameBySerialNo(String serialno);

    @Query(value ="SELECT lpad(max(invoiceno)+1,5,1) as invoiceno FROM jeewacomputersproject.sales;",nativeQuery = true)
    public String generateInvoiceNo();

    @Query(value ="SELECT invoiceno FROM jeewacomputersproject.sales as s inner join jeewacomputersproject.sales_has_due_to_repairitem as sd on s.id = sd.sales_id where s.id not in(select sales_id from jeewacomputersproject.sales_has_due_to_repairitem);",nativeQuery = true)
    public String getInvoiceNo();

    @Query(value ="select i from Invoice i where i.id not in (select sd.sales_id.id from SalesHasDue sd)")
    public List<Invoice> getInvoiceNo1();

    // @Query(value ="select s from SerialNo s where s.id in (select ss.serialno_id from SalesHasSerial ss where ss.sales_id in (select i.id from Invoice i where i.salesHasDues.id in (select sd.id from SalesHasDue sd where sd.due_to_repairitem_id in (where ))))")
    //SELECT * FROM jeewacomputersproject.serialno where serialno not in(SELECT serialno FROM jeewacomputersproject.due_to_repairitem) and id in (SELECT serialno_id FROM jeewacomputersproject.sales_has_serialno);
    @Query(value ="select s from SerialNo s where s.serialno not in (select d.serialno from DuetoRepair d ) and s.serialno in (select ss.serialno_id.serialno from SalesHasSerial ss)")
    public List<SerialNo> getInvoiceNo2();

    @Query(value ="select ss.warrentystartdate from SalesHasSerial ss where ss.serialno_id.serialno = ?1")
    public LocalDate getWarrantyStartDate(String serialno);






    





   
    // SELECT * FROM jeewacomputersproject.customer where id in (SELECT customer_id FROM jeewacomputersproject.sales where id in(SELECT sales_id FROM jeewacomputersproject.sales_has_serialno where serialno_id = (SELECT id from jeewacomputersproject.serialno where serialno = "1111")));
    // @Query(value ="select warrenty from ?1")
    // public Integer getWarrenty(String category);

    
    
} 
