package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.Laptop;

public interface LaptopDao extends JpaRepository<Laptop, Integer>  {
    
}
