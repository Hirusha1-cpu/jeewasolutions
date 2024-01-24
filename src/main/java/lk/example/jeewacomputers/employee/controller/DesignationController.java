package lk.example.jeewacomputers.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.employee.dao.DesignationDao;
import lk.example.jeewacomputers.employee.entity.Designation;


@RestController
public class DesignationController {
    @Autowired
    private DesignationDao dao;

    @GetMapping(value = "/designation/getlist", produces = "application/json")
    public List<Designation> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

}
