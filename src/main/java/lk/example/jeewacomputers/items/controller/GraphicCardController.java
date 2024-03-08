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
import lk.example.jeewacomputers.items.dao.GraphicCardDao;
import lk.example.jeewacomputers.items.entity.GraphicCard;

@RestController
public class GraphicCardController {
     @Autowired
    private GraphicCardDao dao;

    @GetMapping(value = "/graphiccard/getlist", produces = "application/json")
    public List<GraphicCard> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

     @RequestMapping(value = "/graphiccard")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Graphic");
        viewEmp.addObject("title", "Graphic");
        viewEmp.setViewName("forms/graphic_card_form.html");
        return viewEmp;
    }


}
