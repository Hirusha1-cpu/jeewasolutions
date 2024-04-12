package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.grnanditem.entity.GrnHasCategory;

public interface GrnHasCategoryDao extends JpaRepository<GrnHasCategory, Integer> {
    
}
