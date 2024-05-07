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

    // @Query(value ="select warrenty from ?1")
    // public Integer getWarrenty(String category);

    
    
} 
