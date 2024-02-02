package lk.example.jeewacomputers.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import java.time.LocalDateTime;
import java.util.List;
import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.employee.entity.Employee;
// import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class EmployeeController {
     @Autowired
    //create dao object
    private EmployeeDao dao;

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/employee/getlist", produces = "application/json")
    public List<Employee> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

     //create get mapping for get employee list withot user accounts
     @GetMapping(value = "/employee/listwithoutuseraccount",produces = "application/json")
     public List<Employee> getEmployeeListWithoutUserAccount(){
         return dao.getEmployeeListWithoutUserAccount();
     }


    //load the employee ui file using requesting this url (/employee)
     @RequestMapping(value = "/employee")
    public ModelAndView employeeUI() {
       ModelAndView viewEmp = new ModelAndView();
       viewEmp.setViewName("systemuser_components/employee.html");
        return viewEmp;
    }

    //post the employee object to the database
    @PostMapping(value = "/employee")
    public String save(@RequestBody Employee employee) {
        try {
            employee.setAddeddatetime(LocalDateTime.now().toLocalDate());//set current date time
            String nextEmpNo = dao.getNextEmpNo();
            if (nextEmpNo.equals("") || nextEmpNo.equals(null)) {
                employee.setEmpno("00000001");
                
            } else {
                employee.setEmpno(nextEmpNo); //emp no auto generated
            }
            dao.save(employee);
            return "OK";
        } catch (Exception e) {
            return "save Not Completed" + e.getMessage();
        }
    }

    

}
