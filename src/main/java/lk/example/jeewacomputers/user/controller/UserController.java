package lk.example.jeewacomputers.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
    
        ModelAndView viewEmp = new ModelAndView();


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
        try {
           user.setAdded_datetime(LocalDateTime.now());
            dao.save(user);
            return "OK";
        } catch (Exception e) {
            return "save Not Completed" + e.getMessage();
        }
    }

}
