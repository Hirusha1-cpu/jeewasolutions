package lk.example.jeewacomputers.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.employee.entity.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Integer> {

    
}
