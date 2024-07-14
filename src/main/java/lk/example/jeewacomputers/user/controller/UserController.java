package lk.example.jeewacomputers.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.employee.dao.EmployeeStatusDao;
import lk.example.jeewacomputers.employee.entity.Employee;
import lk.example.jeewacomputers.privilege.controller.PrivilegeController;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class UserController {
    @Autowired
    // create dao object
    private UserDao dao;

    @Autowired
    // create dao object
    private EmployeeDao empDao;

    @Autowired
    private EmployeeStatusDao statusDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @RequestMapping(value = "/user")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "user");
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "User");

        if (logUserPrivi.get("select")) {

            viewEmp.addObject("title", "User Management - BIT Project 2024");

            viewEmp.setViewName("systemuser_components/user.html");
            return viewEmp;
            // return "User Save Not Completed: You Haven't Permission";
        } else {

            viewEmp.addObject("title", "Error Permission - BIT Project");

            viewEmp.setViewName("error/error.html");
            return viewEmp;
        }
    }

    // create get mapping for get user all data --- [/user/findall]
    @GetMapping(value = "/user/getlist", produces = "application/json")
    public List<User> findAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "user");
        if (logUserPrivi.get("select")) {
            return dao.findAll(Sort.by(Direction.DESC, "id"));
        } else {
            List<User> emptyError = new ArrayList<User>();
            return emptyError;

        }
    }

    // post the employee object to the database
    @PostMapping(value = "/user")
    public String save(@RequestBody User user) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "user");
        if (logUserPrivi.get("insert")) {
            // user object eke username eka use krala user details gennagnnw
            // ita passe ehem user kenekge username ekak thyenwada balanwa
            // ita passe ehem username ekak danna den na mokada eka already exist hinda
            User extUserName = dao.getUserByUsername(user.getUsername());
            if (extUserName != null) {
                return "User Save not completed yet: given username already exists";
            }

            // Mekdi employee id eka use karala user wa gnnwa
            User extUserEmployee = dao.getUserByEmployeeId(user.getEmployee().getId());
            if (extUserEmployee != null) {
                return "User Save not completed yet: given employee already exists";

            }
            try {
                user.setAdded_datetime(LocalDateTime.now());
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                dao.save(user);
                return "OK";
            } catch (Exception e) {
                return "save Not Completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to insert a new user";
        }
    }

    @PutMapping(value = "/user")
    public String updateUser(@RequestBody User user) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "user");
        if (logUserPrivi.get("update")) {

            // get user authentication object

            // check auth person
            User extUser = dao.getReferenceById(user.getId());
            if (extUser == null) {
                return "Update not completed : User Not Exist";
            }
            // check duplicate
            User extUsername = dao.getUserByUsername(user.getUsername());

            if (extUsername != null && !user.getId().equals(extUsername.getId())) {
                return "Update not completed : User name already exist..!";
            }
            try {
                // if(!user.getPassword().equals("")){

                // if(extUser.getPassword().equals(user.getPassword())){
                // return "Update Failed : Given password already exist";
                // }else{
                // //encrypt password

                // }
                // }else{
                // user.setPassword(extUser.getPassword());
                // }
                user.setPassword(extUser.getPassword());
                dao.save(user);
                return "OK";
            } catch (Exception e) {

                return "Update not completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to update a new user";
        }
    }

    @DeleteMapping(value = "/user")
    public String deleteUser(@RequestBody User user) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "user");
        if (logUserPrivi.get("delete")) {
            User extUser = dao.getReferenceById(user.getId());


            try {
                user.setDeleted_datetime(LocalDateTime.now());
                user.setStatus(false);
                dao.save(user);

                Employee empUser = dao.getEmpByUsername(user.getUsername());
                if (empUser != null) {
                    empUser.setEmployeestatus_id(statusDao.getReferenceById(3));
                    empDao.save(empUser);

                }
                return "OK";
            } catch (Exception e) {

                return "Delete not completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to delete a new user";
        }
    }
}
