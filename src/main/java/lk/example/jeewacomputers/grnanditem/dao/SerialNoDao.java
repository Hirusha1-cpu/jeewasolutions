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

    
    
}
