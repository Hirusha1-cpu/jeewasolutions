package lk.example.jeewacomputers.purchase.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.purchase.entity.Purchase;
import lk.example.jeewacomputers.purchase.entity.PurchaseStatus;
import lk.example.jeewacomputers.user.entity.User;

public interface PurchaseDao extends JpaRepository<Purchase, Integer> {

    //purchase id eka meka wana purchase tika select karanwa
    @Query(value="SELECT * FROM jeewacomputersproject.purchase where id = ?1", nativeQuery = true)
    public Purchase getPurchaseOrdersWithCode(Integer id);
    //supply id eka meka wana purchase tika select karanwa
    @Query(value="SELECT * FROM jeewacomputersproject.purchase where supplier_id = ?1", nativeQuery = true)
    public List<Purchase> getPurchaseOrdersBySupplier(Integer supplier_id);
    // purchase ha grn eka join karala purchase id ekai grn eke purchase id ekai aragena g.purchase_id eka null nati tika select karnwa
    @Query(value="SELECT p.id FROM jeewacomputersproject.purchase p INNER JOIN jeewacomputersproject.grn g ON p.id = g.purchase_id WHERE g.purchase_id IS NOT NULL;", nativeQuery = true)
    public List<Purchase> getPurchaseOrdersNotInGRN();

    @Query("select u from User u where u.username = ?1")
    public User getUsersByUsername(String username);

    @Query("select p from PurchaseStatus p where p.status = ?1")
    public PurchaseStatus getPurchaseStatus(String status);
         
} 
