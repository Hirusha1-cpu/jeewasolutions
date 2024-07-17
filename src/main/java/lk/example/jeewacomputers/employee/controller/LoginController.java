package lk.example.jeewacomputers.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lk.example.jeewacomputers.items.dao.GraphicCardDao;
import lk.example.jeewacomputers.items.entity.GraphicCard;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class LoginController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private GraphicCardDao graphicCardDao;

    @GetMapping(value = "/login")
    public ModelAndView loginUI() {
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login/login.html");
        return loginView;
    }

    @GetMapping(value = "/error")
    public ModelAndView errorUI() {
        ModelAndView loginErrorView = new ModelAndView();
        loginErrorView.setViewName("error/error.html");
        return loginErrorView;
    }
    @GetMapping(value = "/dashboard/getauth")
    public String getAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().toString();
    }


    @GetMapping(value = "/dashboard")
    public ModelAndView indexUI(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.getUserByUsername(auth.getName());
        GraphicCard graphicCard = graphicCardDao.getGraphicByName("ASUS DUAL TTX");
        System.out.println(auth.getAuthorities());
        ModelAndView dashView = new ModelAndView();
        dashView.addObject("logusername", auth.getName());
        dashView.addObject("loguserrole", user.getRoles().iterator().next().getName());
        // user.getRoles().iterator().next() user ta adala palaweni role eka
        // dashView.addObject("loguserphoto", user.getUserPhoto());
        // dashView.addObject("loguserphoto", graphicCard.getGraphic_photo());
        dashView.addObject("modulename", "Dashboard");
        dashView.addObject("title", "Dashboard - BIT Project 2024");
        // if (auth.getAuthorities().toString() == "Manager") {
            
            dashView.setViewName("dashboard.html");
        // }else{
        //     dashView.setViewName("error/error.html");
        // }

        // HttpSession session = request.getSession();
        // session.removeAttribute("loginError"); // Clear the attribute

        return dashView;
    }
}
