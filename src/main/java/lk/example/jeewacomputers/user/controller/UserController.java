package lk.example.jeewacomputers.user.controller;

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
import java.util.List;

import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class UserController {
     @Autowired
    // create dao object
    private UserDao dao;

      @RequestMapping(value = "/user")
    public ModelAndView employeeUI() {
        // get user authentication object
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "User");
        viewEmp.addObject("title", "User Management - BIT Project 2024");

        viewEmp.setViewName("systemuser_components/user.html");
        return viewEmp;
    }

    // create get mapping for get user all data --- [/user/findall]
    @GetMapping(value = "/user/getlist", produces = "application/json")
    public List<User> findAll() {

        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

     //post the employee object to the database
    @PostMapping(value = "/user")
    public String save(@RequestBody User user) {
        //  user object eke username eka use krala user details gennagnnw
        //ita passe ehem user kenekge username ekak thyenwada balanwa
        //ita passe ehem username ekak danna den na mokada eka already exist hinda
         User extUserName = dao.getUserByUsername(user.getUsername());
         if (extUserName != null) {
             return "User Save not completed yet: given username already exists";
         }
         
         //Mekdi employee id eka use karala user wa gnnwa
         User extUserEmployee = dao.getUserByEmployeeId(user.getEmployee().getId());
         if (extUserEmployee != null) {
             return "User Save not completed yet: given employee already exists";
 
         }
        try {
           user.setAdded_datetime(LocalDateTime.now());
            dao.save(user);
            return "OK";
        } catch (Exception e) {
            return "save Not Completed" + e.getMessage();
        }
    }

}
