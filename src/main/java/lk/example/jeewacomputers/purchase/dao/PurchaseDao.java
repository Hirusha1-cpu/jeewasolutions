package lk.example.jeewacomputers.purchase.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.purchase.entity.Purchase;

public interface PurchaseDao extends JpaRepository<Purchase, Integer> {

    @Query(value="SELECT * FROM jeewacomputersproject.purchase where id = ?1", nativeQuery = true)
    public Purchase getPurchaseOrdersWithCode(Integer id);
    
     
} 
