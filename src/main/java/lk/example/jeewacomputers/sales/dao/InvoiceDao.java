package lk.example.jeewacomputers.sales.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.sales.entity.Invoice;

public interface InvoiceDao extends JpaRepository<Invoice, Integer>{
    @Query(value = "select s from SerialNo s where s.serialno = ?1")
    public SerialNo getItemBySerialNo(String serialno);
    
} 
