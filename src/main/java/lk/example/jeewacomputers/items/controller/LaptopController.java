package lk.example.jeewacomputers.items.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.util.*;

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
