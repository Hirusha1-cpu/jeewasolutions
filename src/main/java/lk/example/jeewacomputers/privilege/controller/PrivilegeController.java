package lk.example.jeewacomputers.privilege.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.privilege.dao.PrivilegeDao;
import lk.example.jeewacomputers.privilege.entity.Privilege;

@RestController
public class PrivilegeController {
    @Autowired
    // create dao object
    private PrivilegeDao dao;

    // @Autowired
    // private PrivilegeController privilegeController;

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/privilege/getlist", produces = "application/json")
    public List<Privilege> findAll() {
        // login user authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = getPrivilegeByUserModule(auth.getName(),
                "privilege");
                if (logUserPrivi.get("select")) {

                    return dao.findAll(Sort.by(Direction.DESC, "id"));
                }else{
                    List<Privilege> emptyError = new ArrayList<Privilege>();
                    return emptyError;

                }        
    }

    // load the employee ui file using requesting this url (/employee)
    @RequestMapping(value = "/privilege")
    public ModelAndView privilegeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = getPrivilegeByUserModule(auth.getName(),
                "privilege");
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Privilege");
        if (logUserPrivi.get("select")) {
            viewEmp.addObject("title", "Privilege Management - BIT Project 2024");
            viewEmp.setViewName("systemuser_components/privilege.html");
            return viewEmp;
        } else {
            viewEmp.addObject("title", "Error Permission - BIT Project");
            viewEmp.setViewName("error/error.html");
            return viewEmp;
        }
    }

    // create get mapping for get privilege by logged user module
    @GetMapping(value = "/privilege/bylogedusermodule/{modulename}", produces = "application/json")
    public HashMap<String, Boolean> getPrivilegeByLoggedUserModule(@PathVariable("modulename") String modulename) {
        // public Privilege getPrivilegeByLoggedUserModule(@PathVariable("modulename")
        // String modulename){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return getPrivilegeByUserModule(auth.getName(), modulename);
    }

    @PostMapping(value = "/privilege")
    public String save(@RequestBody Privilege privilege) {

        // duplicate
        // Privilege extPrivilege = dao.getByRoleModule(privilege.getRole_id().getId(),
        // privilege.getModule_id().getId());
        // if (extPrivilege != null) {
        // return "Save not completed : Privilege alredy exist by given role and
        // module";
        // }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi =getPrivilegeByUserModule(auth.getName(),
                "privilege");
        if (logUserPrivi.get("insert")) {

            try {
                // set auto generated value

                // oparation
                dao.save(privilege);
                return "OK";

            } catch (Exception e) {

                return "Save not completed :" + e.getMessage();
            }
        } else {
            return "You have not permissions to insert a new privilege";

        }

    }

    @PutMapping(value = "/privilege")
    public String update(@RequestBody Privilege privilege) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = getPrivilegeByUserModule(auth.getName(),
                "privilege");
        if (logUserPrivi.get("update")) {
            try {
                dao.save(privilege);
                return "OK";
            } catch (Exception e) {
                return "Update not completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to update a new privilege";

        }
    }

    @DeleteMapping(value = "/privilege")
    public String delete(@RequestBody Privilege privilege) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = getPrivilegeByUserModule(auth.getName(),
                "privilege");
        if (logUserPrivi.get("delete")) {
            Privilege extEmp = dao.getReferenceById(privilege.getId());
            if (extEmp == null) {
                // return "Delete not completed :privilege not exist";
            }
            // meka delete kroth eke crud operation walata api deela thynne boolean status
            // tika false karanna one
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
        } else {
            return "You have not permissions to delete a new privilege";

        }

    }

    // define function for get privilege by user module
    public HashMap<String, Boolean> getPrivilegeByUserModule(String username, String modulename) {
        // public Privilege getPrivilegeByUserModule(String username, String modulename)
        // {
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
