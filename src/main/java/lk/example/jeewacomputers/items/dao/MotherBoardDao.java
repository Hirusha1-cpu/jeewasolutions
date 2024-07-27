package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.MotherBoard;

public interface MotherBoardDao extends JpaRepository<MotherBoard, Integer>{
    @Query(value = "SELECT l FROM MotherBoard l where l.qty < l.reorder_point")
    public List<MotherBoard> getReorderPointReached();
    
}
