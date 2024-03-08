package lk.example.jeewacomputers.categorypcpartandbrand.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import lk.example.jeewacomputers.categorypcpartandbrand.dao.PcPartStatusDao;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.PcPartStatus;

@RestController
public class PcPartStatusController {
         @Autowired
    private PcPartStatusDao dao;

    @GetMapping(value = "/pcstatus/getlist", produces = "application/json")
    public List<PcPartStatus> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }    
}
