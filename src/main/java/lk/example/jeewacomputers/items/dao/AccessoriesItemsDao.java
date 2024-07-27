package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.AccessoriesItems;

public interface AccessoriesItemsDao extends JpaRepository<AccessoriesItems, Integer>  {
    
    @Query(value = "SELECT l FROM AccessoriesItems l where l.qty < l.reorder_point")
    public List<AccessoriesItems> getReorderPointReached();
}
