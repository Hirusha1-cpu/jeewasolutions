package lk.example.jeewacomputers.items.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

import lk.example.jeewacomputers.categorypcpartandbrand.dao.CategoryDao;
import lk.example.jeewacomputers.grnanditem.dao.GrnDao;
import lk.example.jeewacomputers.items.dao.RamDao;
import lk.example.jeewacomputers.items.entity.Ram;

@RestController
public class RamController {
    @Autowired
    private RamDao dao;

    @Autowired
    // create dao object
    private GrnDao grndao;

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping(value = "/ram/getlist", produces = "application/json")
    public List<Ram> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/ram/getreorderreached", produces = "application/json")
    public List<Ram> findAllReorderReached() {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return dao.getReorderPointReached();
    }

    @GetMapping(value = "/ram/getqty/{name}", produces = "application/json")
    public String findQtyByName(@PathVariable("name") String name) {
        List<Ram> laps = findAll();
        for (Ram lap : laps) {
            if (lap.getName().equals(name)) { // Check if the laptop name matches
                Integer qty = dao.getQtyFromName(name);
                System.out.println(qty);
                lap.setQty(qty);
                dao.save(lap);
                return "OK"; // Exit the method after updating the matching laptop
            }
        }
        return "Ram not found";
    }

    @RequestMapping(value = "/ram")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Ram");
        viewEmp.addObject("title", "Ram");
        viewEmp.setViewName("forms/ram_form.html");
        return viewEmp;
    }

    @GetMapping(value = "/ram/getselratio/{name}", produces = "application/json")
    public BigDecimal findSellRatio(@PathVariable("name") String name) {
        // login user authentication and authorization
        return dao.getSellRatio(name);
    }

    @PostMapping(value = "/ram")
    public String save(@RequestBody Ram ram) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        try {
            ram.setCategory_id(categoryDao.getReferenceById(1));
            ram.setAdded_user_id(grndao.getUsersByUsername(auth.getName()));
            ram.setAdded_datetime(LocalDateTime.now().toLocalDate());
            dao.save(ram);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

}
