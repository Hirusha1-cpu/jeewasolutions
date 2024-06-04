package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.items.entity.GraphicCard;

public interface GraphicCardDao extends JpaRepository<GraphicCard, Integer>{

    // @Query(value = "select new GraphicCard(g.id, g.reorder_point) from GraphicCard g where g.name = ?1")
    // public GraphicCard getReorderPoint(String name);

    @Query(value = "select g.reorder_point from GraphicCard g where g.name = ?1")
    public Integer getReorderPoint(String name);

    @Query(value = "select g.sales_rate from GraphicCard g where g.name = ?1")
    public Integer getSellRatio(String name);
    
} 