package lk.example.jeewacomputers.employee.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class LoginController {
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

    @GetMapping(value = "/dashboard")
    public ModelAndView indexUI(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView dashView = new ModelAndView();
        dashView.addObject("logusername", auth.getName());
        dashView.addObject("modulename", "Dashboard");
        dashView.addObject("title", "Dashboard - BIT Project 2024");

        dashView.setViewName("dashboard.html");

        // HttpSession session = request.getSession();
        // session.removeAttribute("loginError"); // Clear the attribute

        return dashView;
    }
}
