package lk.example.jeewacomputers.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import lk.example.jeewacomputers.employee.dao.EmployeeStatusDao;
import lk.example.jeewacomputers.employee.entity.EmployeeStatus;

@RestController
public class EmployeeStatusController {
    @Autowired
    private EmployeeStatusDao dao;

    @GetMapping(value = "empstatus/getlist", produces = "application/json")
    public List<EmployeeStatus> findall(){
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }
}
