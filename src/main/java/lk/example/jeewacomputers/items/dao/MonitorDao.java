package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.Monitor;

public interface MonitorDao extends JpaRepository<Monitor, Integer>{
    @Query(value = "SELECT l FROM Monitor l where l.qty < l.reorder_point")
    public List<Monitor> getReorderPointReached();
    
}