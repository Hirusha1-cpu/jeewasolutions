package lk.example.jeewacomputers.privilege.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.privilege.entity.Role;

public interface RoleDao extends JpaRepository<Role, Integer> {

    
} 
