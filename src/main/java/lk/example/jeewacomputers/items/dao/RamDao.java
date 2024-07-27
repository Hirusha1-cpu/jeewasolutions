package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.Ram;

public interface RamDao extends JpaRepository<Ram, Integer> {
  @Query(value = "SELECT l FROM PowerSupply l where l.qty < l.reorder_point")
    public List<Ram> getReorderPointReached();
    
} 
