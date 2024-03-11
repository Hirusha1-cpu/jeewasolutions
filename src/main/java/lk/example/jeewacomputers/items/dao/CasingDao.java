package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.Casing;

public interface CasingDao extends JpaRepository<Casing, Integer> {
    
}
