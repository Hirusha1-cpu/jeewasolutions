package lk.example.jeewacomputers.grnanditem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.*;

import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;

@RestController
public class SerialNoController {
    
    @Autowired
    private SerialNoDao serialNoDao;

    @GetMapping(value = "/serialno/getlist", produces = "application/json")
    public List<SerialNo> findAll() {
        // login user authentication and authorization
        return serialNoDao.findAll();
    }
    @GetMapping(value = "/serialno/getavailablelist", produces = "application/json")
    public List<SerialNo> findAlls() {
        // login user authentication and authorization
        return serialNoDao.getAvailableIst();
    }

    @GetMapping(value = "/serialno/getlistwithoutnotnull", produces = "application/json")
    public List<SerialNo> findSerialNoList() {
        // login user authentication and authorization
        return serialNoDao.getOnlySerialNo();
    }

    @GetMapping(value = "/serialno/getitemsbycusname/{name}",produces = "application/json")
    public SerialNo getItemsByCusName(@PathVariable("name") String name) {
        return serialNoDao.getItemsByCusName(name);
    }

    @GetMapping(value = "/serialno/getitemprice/{name}",produces = "application/json")
    public BigDecimal getItemPriceFromDiag(@PathVariable("name") String name) {
        return serialNoDao.getItemPriceForDiagnose(name);
    }


}
