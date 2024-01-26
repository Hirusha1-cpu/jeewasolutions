package lk.example.jeewacomputers.privilege.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import lk.example.jeewacomputers.privilege.dao.PrivilegeDao;
import lk.example.jeewacomputers.privilege.entity.Privilege;

@RestController
public class PrivilegeController {
       @Autowired
    //create dao object
    private PrivilegeDao dao;

       // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/privilege/getlist", produces = "application/json")
    public List<Privilege> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }
}
