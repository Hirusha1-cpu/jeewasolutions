package lk.example.jeewacomputers.report.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.employee.entity.Employee;

import java.util.*;

public interface ReportDao extends JpaRepository<Employee,Integer> {
    @Query(value = "select e from Employee e where e.employeestatus_id.id = 1")
    List<Employee> workingEmployeeList(); 

    @Query(value = "select e from Employee e where e.employeestatus_id.id = ?1 and e.designation_id.id = ?2")
    List<Employee> employeesListByStatusandDesination(Integer status, Integer designation);

}
