package lk.example.jeewacomputers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@SpringBootApplication
public class JeewacomputersApplication {

	public static void main(String[] args) {
		SpringApplication.run(JeewacomputersApplication.class, args);
		System.out.println("Helllo World");


	}

		@RequestMapping(value = "/testui",method = RequestMethod.GET)
	public ModelAndView testUi(){
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("dashboard.html");
		return modelAndView;
	}

}
