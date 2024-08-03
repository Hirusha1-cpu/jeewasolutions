package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.*;
import lk.example.jeewacomputers.items.entity.Ram;

public interface RamDao extends JpaRepository<Ram, Integer> {
  @Query(value = "SELECT l FROM Ram l where l.qty < l.reorder_point")
    public List<Ram> getReorderPointReached();

       @Query(value = "select l.sales_rate from Ram l where l.name = ?1")
    public BigDecimal getSellRatio(String name);

    @Query(value = "SELECT count(*) as qty FROM jeewacomputersproject.serialno where availability = 1 && itemname in (SELECT name FROM jeewacomputersproject.ram where name= ?1)", nativeQuery = true)
    public Integer getQtyFromName(String name);

    
} 
