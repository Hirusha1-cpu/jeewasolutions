package lk.example.jeewacomputers.suppliers.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.suppliers.entity.SupplierBankDetails;

public interface SupplierBankDetailsDao extends JpaRepository<SupplierBankDetails, Integer> {

    
} 