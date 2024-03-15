package lk.example.jeewacomputers.suppliers.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.suppliers.entity.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Integer> {

    
} 
