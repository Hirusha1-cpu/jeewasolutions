package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.HardDisk;

public interface HardDiskDao extends JpaRepository<HardDisk,Integer>{
    @Query(value = "SELECT l FROM HardDisk l where l.qty < l.reorder_point")
    public List<HardDisk> getReorderPointReached();
    
} 