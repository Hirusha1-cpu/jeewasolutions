package lk.example.jeewacomputers.report.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.util.HashMap;
import java.util.List;

import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.items.dao.GraphicCardDao;
import lk.example.jeewacomputers.items.entity.GraphicCard;
import lk.example.jeewacomputers.privilege.controller.PrivilegeController;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class ReportController {

    @Autowired
    // create dao object
    private EmployeeDao dao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private GraphicCardDao graphicCardDao;


    // load the employee ui file using requesting this url (/employee)
    @RequestMapping(value = "/reportpedingemployee")
    public ModelAndView reportpedingemployeeEmployeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.getUserByUsername(auth.getName());
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "employee");
        GraphicCard graphicCard = graphicCardDao.getGraphicByName("ASUS DUAL TTX");
        System.out.println(auth);
        
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Employee");
        viewEmp.addObject("loguserrole", user.getRoles().iterator().next().getName());
        viewEmp.addObject("loguserphoto", graphicCard.getGraphic_photo());
        if ((logUserPrivi.get("select")) && (dao.getStatusOfEmployee("Deleted", auth.getName()) == null)) {
            viewEmp.addObject("title", "Report Management - BIT Project 2024");
            viewEmp.setViewName("systemuser_components/reportpedingemployee.html");
            return viewEmp;
        } else {
            viewEmp.addObject("title", "Error - BIT Project 2024");
            viewEmp.setViewName("error/error.html");
            return viewEmp;
        }
    }


    @RequestMapping(value = "/reportdataworkingemployee")
    public ModelAndView reportpedingorderEmployeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.getUserByUsername(auth.getName());
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "employee");
        GraphicCard graphicCard = graphicCardDao.getGraphicByName("ASUS DUAL TTX");
        System.out.println(auth);
        
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Employee");
        viewEmp.addObject("loguserrole", user.getRoles().iterator().next().getName());
        viewEmp.addObject("loguserphoto", graphicCard.getGraphic_photo());
        if ((logUserPrivi.get("select")) && (dao.getStatusOfEmployee("Deleted", auth.getName()) == null)) {
            viewEmp.addObject("title", "Report Management - BIT Project 2024");
            viewEmp.setViewName("reports/report.html");
            return viewEmp;
        } else {
            viewEmp.addObject("title", "Error - BIT Project 2024");
            viewEmp.setViewName("error/error.html");
            return viewEmp;
        }
    }
}
