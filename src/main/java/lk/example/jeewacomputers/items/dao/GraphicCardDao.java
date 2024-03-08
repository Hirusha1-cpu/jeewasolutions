package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.GraphicCard;

public interface GraphicCardDao extends JpaRepository<GraphicCard, Integer>{

    
} 