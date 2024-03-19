package lk.example.jeewacomputers.suppliers.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.suppliers.entity.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Integer> {
    @Query(value="SELECT max(id) FROM jeewacomputersproject.supplier", nativeQuery = true)
    public Integer getSupplierNo();

    @Query(value="SELECT lpad(max(s.supplier_code)+1,5,0) as supplier_code FROM jeewacomputersproject.supplier as s;", nativeQuery = true)
    public String getSupplierCode();
 
} 
