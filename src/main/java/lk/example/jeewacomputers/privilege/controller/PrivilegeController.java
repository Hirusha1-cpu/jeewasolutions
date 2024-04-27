package lk.example.jeewacomputers.privilege.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.privilege.dao.PrivilegeDao;
import lk.example.jeewacomputers.privilege.entity.Privilege;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class PrivilegeController {
    @Autowired
    // create dao object
    private PrivilegeDao dao;

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/privilege/getlist", produces = "application/json")
    public List<Privilege> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // load the employee ui file using requesting this url (/employee)
    @RequestMapping(value = "/privilege")
    public ModelAndView privilegeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Privilege");
        viewEmp.addObject("title", "Privilege Management - BIT Project 2024");
        viewEmp.setViewName("systemuser_components/privilege.html");
        return viewEmp;
    }

    @PostMapping(value = "/privilege")
    public String save(@RequestBody Privilege privilege) {

        // duplicate
        Privilege extPrivilege = dao.getByRoleModule(privilege.getRole_id().getId(), privilege.getModule_id().getId());
        if (extPrivilege != null) {
            return "Save not completed : Privilege alredy exist by given role and module";
        }

        try {
            // set auto generated value

            // oparation
            dao.save(privilege);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :" + e.getMessage();
        }

    }

    @PutMapping(value = "/privilege")
    public String update(@RequestBody Privilege privilege) {
        try {
            dao.save(privilege);
            return "OK";
         } catch (Exception e) {
            return "Update not completed" + e.getMessage();
         }
    }

    @DeleteMapping(value = "/privilege")
    public String delete(@RequestBody Privilege privilege){
        Privilege extEmp = dao.getReferenceById(privilege.getId());
        if (extEmp == null) {
            return "Delete not completed :privilege not exist";
        }

        //meka delete kroth eke crud operation walata api deela thynne boolean status tika false karanna one
        try {
            // hard delete
            // dao.delete(employee);

            extEmp.setSel(false);
            extEmp.setInst(false);
            extEmp.setUpd(false);
            extEmp.setDel(false);

            dao.save(extEmp);
            return "OK";

        } catch (Exception e) {
            return "Delete Not Completed" + e.getMessage();
        }
    }

        //define function for get privilege by user module
    public HashMap<String, Boolean> getPrivilegeByUserModule(String username, String modulename) {
    // public Privilege getPrivilegeByUserModule(String username, String modulename) {
        HashMap<String, Boolean> userPrivilege = new HashMap<String, Boolean>();
        if (username.equals("Admin")) {
            userPrivilege.put("select", true);
            userPrivilege.put("insert", true);
            userPrivilege.put("update", true);
            userPrivilege.put("delete", true);
        } else {

            String userPrivi = dao.getPrivilegeByUserModule(username, modulename);
            System.out.println(userPrivi);
            String[] userPriviList = userPrivi.split(",");
            userPrivilege.put("select", userPriviList[0].equals("1"));
            userPrivilege.put("insert", userPriviList[1].equals("1"));
            userPrivilege.put("update", userPriviList[2].equals("1"));
            userPrivilege.put("delete", userPriviList[3].equals("1"));
        }
        return userPrivilege;
    }


}
