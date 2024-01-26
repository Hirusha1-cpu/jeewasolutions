package lk.example.jeewacomputers.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.user.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {

    
}