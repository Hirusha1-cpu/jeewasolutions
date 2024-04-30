package lk.example.jeewacomputers.sales.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.sales.entity.Invoice;

public interface InvoiceDao extends JpaRepository<Invoice, Integer>{

    
} 
