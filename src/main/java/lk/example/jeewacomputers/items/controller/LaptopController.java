package lk.example.jeewacomputers.items.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.util.*;
import java.math.BigDecimal;
import lk.example.jeewacomputers.items.dao.LaptopDao;
import lk.example.jeewacomputers.items.entity.Laptop;

@RestController
public class LaptopController {
    @Autowired
    private LaptopDao laptopDao;

    @GetMapping(value = "/laptop/getlist", produces = "application/json")
    public List<Laptop> findAllLaps() {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return laptopDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/laptop/getreorderreached", produces = "application/json")
    public List<Laptop> findAllReorderReached() {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return laptopDao.getReorderPointReached();
    }

    @GetMapping(value = "/laptop/getreorderreached/{name}", produces = "application/json")
    public Laptop findoneReorderReached(@PathVariable("name") String name) {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return laptopDao.getReorderPointReached(name);
    }

    @GetMapping(value = "/laptop/getselratio/{name}", produces = "application/json")
    public BigDecimal findSellRatio(@PathVariable("name") String name) {
        // login user authentication and authorization
        return laptopDao.getSellRatio(name);
    }

    @GetMapping(value = "/laptop/getqty/{name}", produces = "application/json")
    public String findQtyByName(@PathVariable("name") String name) {
        List<Laptop> laps = findAllLaps();
        for (Laptop lap : laps) {
            if (lap.getName().equals(name)) { // Check if the laptop name matches
                Integer qty = laptopDao.getQtyFromName(name);
                System.out.println(qty);
                lap.setQty(qty);
                laptopDao.save(lap);
                return "OK"; // Exit the method after updating the matching laptop
            }
        }
        return "Laptop not found";
    }

    @GetMapping(value = "/laptop/getreorderppoint/{name}", produces = "application/json")
    public Integer findQty(@PathVariable("name") String name) {
        // login user authentication and authorization
        return laptopDao.getReorderPoint(name);
    }

    @RequestMapping(value = "/laptop")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Laptop");
        viewEmp.addObject("title", "Laptop");
        viewEmp.setViewName("forms/laptop_form.html");
        return viewEmp;
    }

}
