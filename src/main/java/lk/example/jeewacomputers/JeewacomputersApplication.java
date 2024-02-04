package lk.example.jeewacomputers;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.privilege.dao.RoleDao;
import lk.example.jeewacomputers.privilege.entity.Role;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
@SpringBootApplication
public class JeewacomputersApplication {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private EmployeeDao employeeDao;

	public static void main(String[] args) {
		SpringApplication.run(JeewacomputersApplication.class, args);
		System.out.println("Hello Jeewa Computers");
	}

	// @RequestMapping(value = "/dashboard",method = RequestMethod.GET)
	// public ModelAndView testUi(){
	// 	ModelAndView modelAndView = new ModelAndView();
	// 	modelAndView.setViewName("dashboard.html");
	// 	return modelAndView;
	// }

	@GetMapping(value = "/createadmin")
	public String generateAdmin(){
		User existAdmin = userDao.getUserByUsername("Admin");
		if (existAdmin == null) {
			
			User adminUser = new User();
			adminUser.setUsername("Admin");
			adminUser.setEmail("admin@gmail.com");
			adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
			adminUser.setStatus(true);
			adminUser.setAdded_datetime(LocalDateTime.now());
	
			adminUser.setEmployee(employeeDao.getReferenceById(1));
			Set<Role> roles = new HashSet<Role>();
			roles.add(roleDao.getReferenceById(1));
	
			adminUser.setRoles(roles);
	
			userDao.save(adminUser);
		}

		return "<script> window.location.replace('http://localhost:8080/login');</script>";
	}

}
