package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.items.entity.GraphicCard;

public interface GraphicCardDao extends JpaRepository<GraphicCard, Integer>{

    // @Query(value = "select new GraphicCard(g.id, g.reorder_point) from GraphicCard g where g.name = ?1")
    // public GraphicCard getReorderPoint(String name);

    @Query(value = "select g.reorder_point from GraphicCard g where g.name = ?1")
    public Integer getReorderPoint(String name);

    @Query(value = "select g.sales_rate from GraphicCard g where g.name = ?1")
    public Integer getSellRatio(String name);

    @Query(value = "select g from GraphicCard g where g.name = ?1")
    public GraphicCard getGraphicByName(String name);

    @Query(value = "SELECT count(*) as qty FROM jeewacomputersproject.serialno where availability = 1 && itemname in (SELECT name FROM jeewacomputersproject.graphiccard where name= ?1)", nativeQuery = true)
    public Integer getQtyFromName(String name);

    @Query(value = "SELECT l FROM GraphicCard l where l.qty < l.reorder_point")
    public List<GraphicCard> getReorderPointReached();




    
} 