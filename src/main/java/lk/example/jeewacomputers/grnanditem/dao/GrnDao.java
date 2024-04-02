package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import lk.example.jeewacomputers.grnanditem.entity.Grn;
import java.util.*;

public interface GrnDao extends JpaRepository<Grn, Integer> {

    @Query(value = "SELECT * FROM jeewacomputersproject.grn where purchase_id = ?1", nativeQuery = true)
    public Grn getPurchaseOrdersWithCode(Integer purchase_id);

    // @Query(value = "SELECT * FROM jeewacomputersproject.grn where id = ?1", nativeQuery = true)
    // public Optional<Grn> getGrnIdByPurchaseId(Integer id);

    @Query(value = "SELECT * FROM jeewacomputersproject.grn where id = ?1", nativeQuery = true)
    public Grn getGrnIdByPurchaseId(Integer id);

} 
