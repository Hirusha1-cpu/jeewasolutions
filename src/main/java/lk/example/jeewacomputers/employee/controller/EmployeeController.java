package lk.example.jeewacomputers.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import java.util.List;
import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.employee.entity.Employee;

@RestController
public class EmployeeController {
     @Autowired
    //create dao object
    private EmployeeDao dao;

       // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/employee/getlist", produces = "application/json")
    public List<Employee> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }
}
