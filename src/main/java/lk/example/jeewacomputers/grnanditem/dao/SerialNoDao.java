package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.grnanditem.entity.SerialNo;

public interface SerialNoDao extends JpaRepository<SerialNo, Integer>{
    
}
