package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.Casing;

public interface CasingDao extends JpaRepository<Casing, Integer> {
    
    @Query(value = "SELECT l FROM Casing l where l.qty < l.reorder_point")
    public List<Casing> getReorderPointReached();
}
