package lk.example.jeewacomputers.privilege.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/privilege/getlist", produces = "application/json")
    public List<Privilege> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // load the employee ui file using requesting this url (/employee)
    @RequestMapping(value = "/privilege")
    public ModelAndView privilegeUI() {
        ModelAndView viewEmp = new ModelAndView();
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

}
