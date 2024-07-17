package lk.example.jeewacomputers.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.inventory.dao.InventoryDao;

import java.util.*;

@RestController
public class InventoryController {

    @Autowired
    private InventoryDao dao;

    @RequestMapping(value = "/inventory")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Graphic");
        viewEmp.addObject("title", "Graphic");
        viewEmp.setViewName("inventory/inventory.html");
        return viewEmp;
    }

    // [/inventory?itemname=ASUS DUAL&id=1]
    @GetMapping(value = "/inventory", params = {"itemname", "id"} ,produces = "application/json")
    public List<SerialNo> getserialListCategoryandItemname(@RequestParam("itemname") String itemname, @RequestParam("id") Integer id) {
        return dao.getListbyItemnameCategory(itemname,id);
    }

    // [/inventory?name=graphiccard]
    @GetMapping(value = "/inventory", params = {"name"} ,produces = "application/json")
    public List<SerialNo> getserialListCategory(@RequestParam("name") String name) {
        return dao.getListbyCategory(name);
    }

}
