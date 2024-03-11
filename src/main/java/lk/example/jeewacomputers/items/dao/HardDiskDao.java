package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.items.entity.HardDisk;

public interface HardDiskDao extends JpaRepository<HardDisk,Integer>{

    
} 