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

import lk.example.jeewacomputers.items.dao.MotherBoardDao;
import lk.example.jeewacomputers.items.entity.GraphicCard;
import lk.example.jeewacomputers.items.entity.MotherBoard;

@RestController
public class MotherBoardController {
      @Autowired
    private MotherBoardDao dao;

    @GetMapping(value = "/motherboard/getlist", produces = "application/json")
    public List<MotherBoard> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

     @GetMapping(value = "/motherboard/getreorderreached", produces = "application/json")
    public List<MotherBoard> findAllReorderReached() {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return dao.getReorderPointReached();
    }
    
     @RequestMapping(value = "/motherboard")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "MotherBoard");
        viewEmp.addObject("title", "MotherBoard");
        viewEmp.setViewName("forms/motherboard_form.html");
        return viewEmp;
    }
}
