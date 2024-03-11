package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import lk.example.jeewacomputers.items.entity.MotherBoard;

public interface MotherBoardDao extends JpaRepository<MotherBoard, Integer>{

    
}
