package lk.example.jeewacomputers.employee.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {
       @GetMapping(value = "/login")
    public ModelAndView loginUI(){
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login/login.html");
        return loginView;
    }

    @GetMapping(value = "/error")
    public ModelAndView errorUI(){
       ModelAndView loginView = new ModelAndView();
       loginView.setViewName("error/error.html");
       return loginView;
   }

      @GetMapping(value = "/dashboard")
     public ModelAndView indexUI(){
    
        ModelAndView loginView = new ModelAndView();

        loginView.setViewName("dashboard.html");
        return loginView;
    }
}
