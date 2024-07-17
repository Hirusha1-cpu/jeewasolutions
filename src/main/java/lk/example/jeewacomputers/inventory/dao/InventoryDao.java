package lk.example.jeewacomputers.inventory.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.grnanditem.entity.SerialNo;

import java.util.*;
public interface InventoryDao extends JpaRepository<SerialNo,Integer> {

    @Query(value = "select s from SerialNo s where s.itemname = ?1 and s.category_id.id = ?2")
    List<SerialNo> getListbyItemnameCategory(String itemname, Integer id);

    @Query(value = "select s from SerialNo s where s.category_id.name = ?1")
    List<SerialNo> getListbyCategory( String name);
} 