package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.grnanditem.entity.Accessories;

public interface AccessoriesDao extends JpaRepository<Accessories, Integer> {
    
}
