package lk.example.jeewacomputers.report.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.employee.entity.Employee;
import lk.example.jeewacomputers.report.dao.ReportDao;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;

@RestController
public class ReportDataController {
    
    @Autowired
    private ReportDao reportDao;

    // /reportdataworkingemployee
    @GetMapping(value = "/reportdataworkingemployee", produces = "application/json")
    public List<Employee> getWorkingEmployeeList() {
        return reportDao.workingEmployeeList();
    }
    // [/reportdataemployee?status=1&designation=1]
    @GetMapping(value = "/reportdataemployee", params = {"status", "designation"} ,produces = "application/json")
    public List<Employee> getWorkingEmployeeListByStatusDesignaList(@RequestParam("status") int status, @RequestParam("designation") int designation) {
        return reportDao.employeesListByStatusandDesination(status, designation);
    }
    
}
