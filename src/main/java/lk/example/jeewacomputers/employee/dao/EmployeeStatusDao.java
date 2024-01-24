package lk.example.jeewacomputers.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.employee.entity.EmployeeStatus;

public interface EmployeeStatusDao extends JpaRepository<EmployeeStatus, Integer>  {

    
} 