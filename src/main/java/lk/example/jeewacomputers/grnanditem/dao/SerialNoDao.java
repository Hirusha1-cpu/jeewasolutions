package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;

public interface SerialNoDao extends JpaRepository<SerialNo, Integer>{

    @Query(value = "SELECT * FROM jeewacomputersproject.serialno where serialno IS NOT NULL and itemname IS NOT NULL", nativeQuery = true)
    public List<SerialNo> getOnlySerialNo();

    @Query(value = "SELECT count(*) FROM jeewacomputersproject.serialno where itemname = ?1 and category_id = ?2", nativeQuery = true)
    public Integer getSameNameSerialNoCount(String itemname, Integer category_id);

    // @Query(value = "SELECT  s.itemname AS serialno_name, s.serialno AS serialno FROM jeewacomputersproject.serialno s INNER JOIN jeewacomputersproject.sales_has_serialno ss ON s.id = ss.serialno_id INNER JOIN jeewacomputersproject.sales sa ON sa.id = ss.sales_id WHERE sa.customer_id IN (SELECT c.id FROM jeewacomputersproject.customer c WHERE name = ?1)", nativeQuery = true)
    @Query(value = "select s from SerialNo s inner join SalesHasSerial ss on s.id = ss.id inner join Invoice i on i.id = ss.id where i.customer_id in (select c.id from Customer c where name = ?1)")
    public SerialNo getItemsByCusName(String name);

    // @Query(value = "SELECT new SerialNo(s.serialno, s.itemname, s.category_id) FROM jeewacomputersproject.serialno s INNER JOIN jeewacomputersproject.sales_has_serialno ss ON s.id = ss.serialno_id INNER JOIN jeewacomputersproject.sales sa ON sa.id = ss.sales_id WHERE sa.customer_id = (SELECT id FROM jeewacomputersproject.customer WHERE name = ?1);", nativeQuery = true)
    // public SerialNo getItemsByCusName(String name);

    // new User(u.id, u.username)
    
}
