package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.Processor;

public interface ProcessorDao extends JpaRepository<Processor, Integer>{
  @Query(value = "SELECT l FROM PowerSupply l where l.qty < l.reorder_point")
    public List<Processor> getReorderPointReached();
    
} 