package lk.example.jeewacomputers.suppliers.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.suppliers.entity.Supplier;
// import lk.example.jeewacomputers.suppliers.entity.SupplierHasCategory;

public interface SupplierDao extends JpaRepository<Supplier, Integer> {
    @Query(value="SELECT max(id) FROM jeewacomputersproject.supplier", nativeQuery = true)
    public Integer getSupplierNo();

    @Query(value="SELECT lpad(max(s.supplier_code)+1,5,0) as supplier_code FROM jeewacomputersproject.supplier as s;", nativeQuery = true)
    public String getSupplierCode();

    @Query(value="SELECT * FROM jeewacomputersproject.supplier where id in(SELECT supplier_id FROM jeewacomputersproject.supplier_has_category where category_id=?1);", nativeQuery = true)
    public List<Supplier> getSupplierNameFromCategory(Integer category_id);

    // @Query(value="select s from Supplier s WHERE s.id IN (select shc.supplier.id from SupplierHasCategory shc where shc.category.id = ?1);", nativeQuery = true)
    // public List<Supplier> getSupplierNameFromCategory(Integer category_id);

    //select c.name from Category c where c.id in (select shc.category_id.id from SupplierHasCategory shc where shc.brand_id.id = ?1)
 
} 
