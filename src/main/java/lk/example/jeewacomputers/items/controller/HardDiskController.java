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

import lk.example.jeewacomputers.items.dao.HardDiskDao;
import lk.example.jeewacomputers.items.entity.GraphicCard;
import lk.example.jeewacomputers.items.entity.HardDisk;

@RestController
public class HardDiskController {
         @Autowired
    private HardDiskDao dao;

    @GetMapping(value = "/harddisk/getlist", produces = "application/json")
    public List<HardDisk> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
        
    }


    @GetMapping(value = "/harddisk/getreorderreached", produces = "application/json")
    public List<HardDisk> findAllReorderReached() {
        // login user authentication and authorization
        // return dao.findAll(Sort.by(Direction.DESC, "id"));
        return dao.getReorderPointReached();
    }


     @RequestMapping(value = "/harddisk")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "HardDisk");
        viewEmp.addObject("title", "HardDisk");
        viewEmp.setViewName("forms/harddisk_form.html");
        return viewEmp;
    }

}
