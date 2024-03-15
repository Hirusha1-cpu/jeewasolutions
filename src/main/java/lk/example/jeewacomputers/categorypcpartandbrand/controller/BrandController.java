package lk.example.jeewacomputers.categorypcpartandbrand.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.categorypcpartandbrand.dao.BrandDao;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Brand;

@RestController
public class BrandController {
    @Autowired
    private BrandDao dao;

    @GetMapping(value = "/brand/getlist", produces = "application/json")
    public List<Brand> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/brand/listbycategory/{category_id}", produces = "application/json")
    public List<String> getCategoryByBrand(@PathVariable("category_id") Integer category_id) {
        return dao.listCategoryViseBrandNames(category_id);
    }

    //brand/listbycategory/1
    // http://localhost:8080/brand/listbycategory?category_id=4
}
