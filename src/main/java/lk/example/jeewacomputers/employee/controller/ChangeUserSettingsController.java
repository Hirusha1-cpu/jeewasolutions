package lk.example.jeewacomputers.employee.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ChangeUserSettingsController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/loggeduser", produces = "application/json")
    public User getLoggedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser = userDao.getUserByUsername(auth.getName());
        loggedUser.setPassword(null);
        return loggedUser;
    }

    @PutMapping(value = "/changeuser")
    public String userUpdate(@RequestBody User user) {

        try {
            User extUser = userDao.getReferenceById(user.getId());
            // if(!user.getPassword().equals("")){
                if (user.getPassword() != null) {
                    
                    if (bCryptPasswordEncoder.matches(user.getPassword(), extUser.getPassword())) {
                        return "Update Failed : Given password already exist";
                    } else {
                        // encrypt password
                        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));                        
                    }
                }else{
                    user.setPassword(extUser.getPassword());
                    // password eka change nattn ekama change kranna
                }
                userDao.save(user);
                return "OK";

        } catch (Exception e) {

            return "User profile change not completed" + e.getMessage();
        }

    }

}
