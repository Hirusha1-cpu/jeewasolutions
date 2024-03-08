package lk.example.jeewacomputers.categorypcpartandbrand.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.categorypcpartandbrand.entity.Brand;

public interface BrandDao extends JpaRepository<Brand,Integer> {

    
} 
