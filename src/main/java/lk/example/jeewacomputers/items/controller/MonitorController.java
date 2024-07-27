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
import lk.example.jeewacomputers.items.dao.MonitorDao;
import lk.example.jeewacomputers.items.entity.Laptop;
import lk.example.jeewacomputers.items.entity.Monitor;

@RestController

public class MonitorController {
      @Autowired
    private MonitorDao dao;

    @GetMapping(value = "/monitor/getlist", produces = "application/json")
    public List<Monitor> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

      @GetMapping(value = "/monitor/getreorderreached", produces = "application/json")
    public List<Monitor> findAllReorderReached() {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return dao.getReorderPointReached();
    }

     @RequestMapping(value = "/monitor")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Monitor");
        viewEmp.addObject("title", "Monitor");
        viewEmp.setViewName("forms/monitor_form.html");
        return viewEmp;
    }   
}
