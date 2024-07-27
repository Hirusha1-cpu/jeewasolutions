package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
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

    @Query(value ="SELECT itemprice FROM jeewacomputersproject.serialno where itemname in (SELECT itemname FROM jeewacomputersproject.diagnosisitems where itemname = ?1 ) ORDER BY RAND() LIMIT 1 ;",nativeQuery = true)
    public BigDecimal getItemPriceForDiagnose(String itemname);

    @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(barcode, 6, 5))+1,5,0),?1) as empno FROM jeewacomputersproject.serialno as s;",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public String getItemBarcode(Integer id);

    @Query(value ="SELECT max(id) FROM jeewacomputersproject.serialno;",nativeQuery = true)
    // @Query(value ="SELECT CONCAT('bcode',lpad(max(SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno FROM SerialNo s")
    public Integer getMaxId();

    @Query(value ="SELECT CONCAT('bcode',lpad((SUBSTRING(barcode, 6, 5))+1,5,0)) as barcode FROM jeewacomputersproject.serialno as s where barcode = ?1;",nativeQuery = true)
    // @Query(value ="select CONCAT('bcode',lpad((SUBSTRING(s.barcode, 6, 5))+1,5,0)) as empno from SerialNo s where s.barcode = ?1")
    public String getItemNextBarcode(String barcode);

    @Query(value ="SELECT s.barcode FROM SerialNo s where s.barcode = ?1")
    public String getExistItemBarcode(String barcode );

    @Query(value ="SELECT s FROM SerialNo s where s.availability = true and s.id not in (select ss.serialno_id.id from  SalesHasSerial ss)")
    public List<SerialNo> getAvailableIst();

    // @Query(value = "SELECT new SerialNo(s.serialno, s.itemname, s.category_id) FROM jeewacomputersproject.serialno s INNER JOIN jeewacomputersproject.sales_has_serialno ss ON s.id = ss.serialno_id INNER JOIN jeewacomputersproject.sales sa ON sa.id = ss.sales_id WHERE sa.customer_id = (SELECT id FROM jeewacomputersproject.customer WHERE name = ?1);", nativeQuery = true)
    // public SerialNo getItemsByCusName(String name);

    // new User(u.id, u.username)
    
}
