package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;

import lk.example.jeewacomputers.items.entity.GraphicCard;
import lk.example.jeewacomputers.items.entity.Laptop;

public interface LaptopDao extends JpaRepository<Laptop, Integer> {

    @Query(value = "select l.sales_rate from Laptop l where l.name = ?1")
    public BigDecimal getSellRatio(String name);

    @Query(value = "select l.reorder_point from Laptop l where l.name = ?1")
    public Integer getReorderPoint(String name);

    @Query(value = "select l from Laptop l where l.name = ?1")
    public Laptop getGraphicByName(String name);

    @Query(value = "SELECT count(*) as qty FROM jeewacomputersproject.serialno where availability = 1 && itemname in (SELECT name FROM jeewacomputersproject.laptop where name= ?1)", nativeQuery = true)
    public Integer getQtyFromName(String name);
}
