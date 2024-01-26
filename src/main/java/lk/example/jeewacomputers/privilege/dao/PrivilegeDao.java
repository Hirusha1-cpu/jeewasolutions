package lk.example.jeewacomputers.privilege.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.privilege.entity.Privilege;

public interface PrivilegeDao extends JpaRepository<Privilege, Integer> {

    
} 