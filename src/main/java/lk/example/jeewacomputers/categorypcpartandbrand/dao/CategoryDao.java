package lk.example.jeewacomputers.categorypcpartandbrand.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;

public interface CategoryDao extends JpaRepository<Category, Integer> {

    // SELECT c.name FROM jeewacomputersproject.category as c where c.id in (SELECT category_id FROM jeewacomputersproject.supplier_has_category where brand_id = 1 );
    // @Query(value = "SELECT c.name FROM jeewacomputersproject.category as c where c.id in (SELECT category_id FROM jeewacomputersproject.supplier_has_category where brand_id = ?1)", nativeQuery = true)
    // public List<Category> listBrandViseCategoryNames(Integer brand_id);

    @Query(value = "select c.name from Category c where c.id in (select shc.category_id.id from SupplierHasCategory shc where shc.brand_id.id = ?1)")
    public List<String> listBrandViseCategoryNames(Integer brand_id);

    //"select c from Category c where c.id in (select bhc.category_id.id from BrandHasCategory bhc where bhc.brand_id.id = ?1)"

}
