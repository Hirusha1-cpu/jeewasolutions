package lk.example.jeewacomputers.suppliers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lk.example.jeewacomputers.suppliers.dao.SupplierHasCategoryDao;
import lk.example.jeewacomputers.suppliers.entity.SupplierHasCategory;

@RestController
public class SupplierHasCategoryController {
    @Autowired
    // create dao object
    private SupplierHasCategoryDao dao;

    // create get mapping for get supplier all data --- [/supplier/findall]
    @GetMapping(value = "/supplierhascategory/getlist", produces = "application/json")
    public List<SupplierHasCategory> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // // create get mapping for get supplier all data --- [/supplier/findall]
    @GetMapping(value = "/supplierhascategory/getlistbycat", params = { "category_id" })
    public List<Integer> getListCategoryVise(@RequestParam("category_id") Integer category_id) {

        // return dao.listCategoryVise(category_id);
        return dao.listCategoryVise(category_id);
        //http://localhost:8080/supplierhascategory/getlistbycat?category_id=4
    }

    // // create get mapping for get supplier all data --- [/supplier/findall]
    @GetMapping(value = "/supplierhascategory/getlistbysup", params = { "supplier_id" })
    public List<Integer> getListSupplierVise(@RequestParam("supplier_id") Integer supplier_id) {

        // return dao.listCategoryVise(category_id);
        return dao.listSupplierVise(supplier_id);
        //http://localhost:8080/supplierhascategory/getlistbycat?category_id=4
    }

    // // create get mapping for get supplier all data --- [/supplier/findall]
    @GetMapping(value = "/supplierhascategory/getlistbybrand", params = { "brand_id" })
    public List<Integer> getListBrandVise(@RequestParam("brand_id") Integer brand_id) {

        return dao.listBrandVise(brand_id); 
        //http://localhost:8080/supplierhascategory/getlistbybrand?brand_id=1
    }

}
