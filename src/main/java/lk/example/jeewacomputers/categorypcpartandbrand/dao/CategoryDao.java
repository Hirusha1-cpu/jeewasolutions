package lk.example.jeewacomputers.categorypcpartandbrand.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;

public interface CategoryDao extends JpaRepository<Category, Integer> {

    
} 
