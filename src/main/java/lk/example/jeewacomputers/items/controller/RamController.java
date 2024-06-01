package lk.example.jeewacomputers.items.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
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
