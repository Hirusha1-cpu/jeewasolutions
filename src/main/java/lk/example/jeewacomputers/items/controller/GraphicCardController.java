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

import jakarta.websocket.server.PathParam;

import java.time.LocalDateTime;
import java.util.*;

import lk.example.jeewacomputers.categorypcpartandbrand.dao.CategoryDao;
import lk.example.jeewacomputers.grnanditem.dao.GrnDao;
import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.items.dao.GraphicCardDao;
import lk.example.jeewacomputers.items.entity.GraphicCard;

@RestController
public class GraphicCardController {
    @Autowired
    // create dao object
    private GrnDao grndao;

    @Autowired
    private GraphicCardDao dao;

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping(value = "/graphiccard/getlist", produces = "application/json")
    public List<GraphicCard> findAll() {
        // login user authentication and authorization
        // findQtyByName();
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/graphiccard/getqty", produces = "application/json")
    public String findQtyByName() {
        List<GraphicCard> graphicCards =  findAll();
        for (GraphicCard graphicCard : graphicCards) {
           Integer qty = dao.getQtyFromName(graphicCard.getName());
           System.out.println(qty);
           graphicCard.setQty(qty);
           dao.save(graphicCard);
        }
        return "OK";
    }

    @GetMapping(value = "/graphiccard/getreorderppoint/{name}", produces = "application/json")
    public Integer findQty(@PathVariable("name") String name) {
        // login user authentication and authorization
        return dao.getReorderPoint(name);
    }

    @GetMapping(value = "/graphiccard/getselratio/{name}", produces = "application/json")
    public Integer findSellRatio(@PathVariable("name") String name) {
        // login user authentication and authorization
        return dao.getSellRatio(name);
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

    @PostMapping(value = "/graphiccard")
    public String save(@RequestBody GraphicCard graphicCard) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        try {
            graphicCard.setCategory_id(categoryDao.getReferenceById(1));
            graphicCard.setAdded_user_id(grndao.getUsersByUsername(auth.getName()));
            graphicCard.setAdded_datetime(LocalDateTime.now().toLocalDate());
            dao.save(graphicCard);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }



}
