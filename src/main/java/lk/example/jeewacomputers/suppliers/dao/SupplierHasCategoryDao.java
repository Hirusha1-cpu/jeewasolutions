package lk.example.jeewacomputers.suppliers.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.*;
import lk.example.jeewacomputers.suppliers.entity.SupplierHasCategory;

public interface SupplierHasCategoryDao extends JpaRepository<SupplierHasCategory, Integer> {

    // methana ; danna epa native wala wada krnne na
    @Query(value = "SELECT brand_id FROM jeewacomputersproject.supplier_has_category where category_id = ?1", nativeQuery = true)
    public List<Integer> listCategoryVise(Integer category_id);

    // methana ; danna epa native wala wada krnne na
    @Query(value = "SELECT category_id FROM jeewacomputersproject.supplier_has_category where brand_id = ?1", nativeQuery = true)
    public List<Integer> listBrandVise(Integer brand_id);
}