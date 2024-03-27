package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.grnanditem.entity.Grn;


public interface GrnDao extends JpaRepository<Grn, Integer> {

    @Query(value="SELECT * FROM jeewacomputersproject.grn where purchase_id = ?1", nativeQuery = true)
    public List<Grn> getPurchaseOrdersWithCode(Integer purchase_id);
    
} 