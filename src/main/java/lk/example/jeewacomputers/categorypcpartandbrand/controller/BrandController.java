package lk.example.jeewacomputers.categorypcpartandbrand.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
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

}
