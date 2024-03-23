package lk.example.jeewacomputers.grnanditem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.grnanditem.dao.GrnDao;
import lk.example.jeewacomputers.grnanditem.entity.Grn;

@RestController
public class GrnController {
    @Autowired
    // create dao object
    private GrnDao dao;

    @GetMapping(value = "/grn/getlist", produces = "application/json")
    public List<Grn> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @RequestMapping(value = "/grn")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "GRN");
        viewEmp.addObject("title", "GRN Management - BIT Project 2024");
        viewEmp.setViewName("grn/grn.html");
        return viewEmp;
    }

}
