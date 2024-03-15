package lk.example.jeewacomputers.categorypcpartandbrand.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import lk.example.jeewacomputers.categorypcpartandbrand.dao.CategoryDao;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;

@RestController
public class CategoryController {
    @Autowired
    private CategoryDao dao;

    @GetMapping(value = "/category/getlist", produces = "application/json")
    public List<Category> findAll() {

        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/category/listbybrand/{brand_id}", produces = "application/json")
    public List<String> getBrandByCategory(@PathVariable("brand_id") Integer brand_id) {
        return dao.listBrandViseCategoryNames(brand_id);
    }
    //category/listbybrand/1

}
