package lk.example.jeewacomputers.privilege.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.privilege.dao.ModuleDao;


@RestController
public class ModuleController {
           @Autowired
    //create dao object
    private ModuleDao dao;

       // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/module/getlist", produces = "application/json")
    public List<lk.example.jeewacomputers.privilege.entity.Module> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }
}
