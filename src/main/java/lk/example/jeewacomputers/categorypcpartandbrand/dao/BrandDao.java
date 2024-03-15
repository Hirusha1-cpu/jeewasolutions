package lk.example.jeewacomputers.categorypcpartandbrand.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Brand;


public interface BrandDao extends JpaRepository<Brand, Integer> {

    // SELECT name FROM jeewacomputersproject.brand as b where b.id in (SELECT brand_id FROM jeewacomputersproject.supplier_has_category where category_id = 4 );
    // @Query(value = "SELECT b.name FROM jeewacomputersproject.brand as b where b.id in (SELECT brand_id FROM jeewacomputersproject.supplier_has_category where category_id = ?1)", nativeQuery = true)
    // public List<Brand> listCategoryViseBrandNames(Integer category_id);

    @Query(value = "select b.name from Brand b where b.id in (select shc.brand_id.id from SupplierHasCategory shc where shc.category_id.id = ?1)")
    public List<String> listCategoryViseBrandNames(Integer category_id);

    //"select c.name from Category c where c.id in (select shc.category_id.id from SupplierHasCategory shc where shc.brand_id.id = ?1)"

// @Query("SELECT b FROM Brand b WHERE b.id IN (SELECT shc.brandId FROM SupplierHasCategory shc WHERE shc.categoryId = :categoryId)")
// public List<Brand> listCategoryViseBrandNames(@Param("categoryId") Integer categoryId);

// SELECT c.name FROM jeewacomputersproject.category as c where c.id in (SELECT category_id FROM jeewacomputersproject.supplier_has_category where brand_id = 1 );
// @Query(value = "SELECT c.name FROM jeewacomputersproject.category as c where c.id in (SELECT category_id FROM jeewacomputersproject.supplier_has_category where brand_id = 1 )", nativeQuery = true)
// public List<Category> listBrandViseCategoryNames(Integer brand_id);

}
