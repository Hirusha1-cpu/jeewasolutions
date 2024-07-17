package lk.example.jeewacomputers.items.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.grnanditem.dao.AccessoriesDao;
import lk.example.jeewacomputers.items.dao.AccessoriesItemsDao;
import lk.example.jeewacomputers.items.dao.CasingDao;
import lk.example.jeewacomputers.items.entity.AccessoriesItems;
import lk.example.jeewacomputers.items.entity.Casing;
import java.util.*;

@RestController
public class AccessoriesController {
       @Autowired
    private AccessoriesItemsDao dao;

    @GetMapping(value = "/accessoriesitems/getlist", produces = "application/json")
    public List<AccessoriesItems> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }



}
