package lk.example.jeewacomputers.grnanditem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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


}