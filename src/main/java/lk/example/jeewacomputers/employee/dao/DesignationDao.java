package lk.example.jeewacomputers.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.employee.entity.Designation;

public interface DesignationDao extends JpaRepository<Designation, Integer> {

    
} 