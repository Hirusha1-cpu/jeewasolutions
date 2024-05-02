package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.grnanditem.entity.SerialNo;

public interface SerialNoDao extends JpaRepository<SerialNo, Integer>{

    // @Query(value = "SELECT id FROM jeewacomputersproject.serialno where serialno = ?1;")
    // public Integer getIdOfSerialNo(String serialNo);
}
