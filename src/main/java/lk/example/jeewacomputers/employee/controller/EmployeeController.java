package lk.example.jeewacomputers.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import lk.example.jeewacomputers.employee.dao.EmployeeDao;
import lk.example.jeewacomputers.employee.dao.EmployeeStatusDao;
import lk.example.jeewacomputers.employee.entity.Employee;
import lk.example.jeewacomputers.privilege.controller.PrivilegeController;
import lk.example.jeewacomputers.user.dao.UserDao;
import lk.example.jeewacomputers.user.entity.User;

@RestController
public class EmployeeController {
    @Autowired
    // create dao object
    private EmployeeDao dao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private EmployeeStatusDao statusDao;

    @Autowired
    private UserDao userDao;

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/employee/getlist", produces = "application/json")
    public List<Employee> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // create get mapping for get employee list withot user accounts
    @GetMapping(value = "/employee/listwithoutuseraccount", produces = "application/json")
    public List<Employee> getEmployeeListWithoutUserAccount() {
        return dao.getEmployeeListWithoutUserAccount();
    }

    // load the employee ui file using requesting this url (/employee)
    @RequestMapping(value = "/employee")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "employee");

        System.out.println(auth);

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "Employee");
        if (logUserPrivi.get("select")) {
            viewEmp.addObject("title", "Employee Management - BIT Project 2024");
            viewEmp.setViewName("systemuser_components/employee.html");
            return viewEmp;
        } else {
            viewEmp.addObject("title", "Error - BIT Project 2024");
            viewEmp.setViewName("error/error.html");
            return viewEmp;
        }
    }

    // post the employee object to the database
    @PostMapping(value = "/employee")
    public String save(@RequestBody Employee employee) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "employee");

        if (logUserPrivi.get("insert")) {
            try {
                Employee extEmployeeMobileNo = dao.getEmployeeByMobile(employee.getMobile());
                if (extEmployeeMobileNo != null) {
                    return "Save not completed :Inserted Mobile is Already Existing";
                }

                // check nic no
                Employee extEmployeeNIC = dao.getEmployeeByNIC(employee.getNic());
                if (extEmployeeNIC != null) {
                    return "Save not completed :Inserted NIC is Already Existing";
                }

                employee.setAddeddatetime(LocalDateTime.now().toLocalDate());// set current date time
                String nextEmpNo = dao.getNextEmpNo();
                if (nextEmpNo.equals("") || nextEmpNo.equals(null)) {
                    employee.setEmpno("00000001");

                } else {
                    employee.setEmpno(nextEmpNo); // emp no auto generated
                }
                dao.save(employee);
                // return "OK";
                return nextEmpNo;
            } catch (Exception e) {
                return "save Not Completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to insert a new employee";
        }
    }

    @Transactional
    @DeleteMapping(value = "/employee")
    public String delete(@RequestBody Employee employee) {
        // get user authentication , delete permissions theyeda balanwa me auth object
        // eken ganna name ekata anuwa
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // update karanwa ape record eka deleted status eka true bawata ha deleted date
        // time eka set kranwa,
        // employee ge status eka deleted kiyla danawa
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "employee");

        if (logUserPrivi.get("delete")) {

            try {
                // request eka ewwa employee ge id eka gennagannwa, id eka pass karanwa adala
                // getReferenceById ekata
                // mokada ehem kenek innwda blanna
                Employee extemp = dao.getReferenceById(employee.getId());
                if (extemp == null) {
                    // delete krnna kalin balanwa mehem kenek innwda kiyla
                    return "Delete not completed :employee not exist";
                }

                // hard delete
                // dao.delete(employee);
                // dao.delete(dao.gerReferenceById(employee.getId()));

                // ehem employee kenek innwanm api inn e employee ge status eka deleted kiyla
                // change karanawa
                extemp.setEmployeestatus_id(statusDao.getReferenceById(3));
                // e wagema employee ge details deleted date time eka change karanwa dan welwata
                extemp.setDeletedatetime(LocalDateTime.now().toLocalDate());
                // save karanwa ape status change karapu employeewa dao wala thyena save
                // function eka use karala
                dao.save(extemp);

                // ita passe user ge user table eke status eka deleted hri false kiyala hari
                // change karanwa
                User extUser = userDao.getUserByEmployeeId(extemp.getId());
                if (extUser != null) {
                    extUser.setStatus(false);
                    userDao.save(extUser);
                }

                return "OK";

            } catch (Exception e) {
                return "Delete Not Completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to delete a new employee";
        }

    }

    // update mapping eka

    @Transactional
    @PutMapping("/employee")
    public String update(@RequestBody Employee employee) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(),
                "employee");

        if (logUserPrivi.get("update")) {
            // mehem employee kenek innwda kiyala balanwa
            Employee extEmployee = dao.getReferenceById(employee.getId());
            if (extEmployee == null) {
                return "Update Not Completed : Employee not available..!";
            }
    
            // employee lage unique dewal tika not null da balanwa e wagema
            // e update eka karapu employee , kalinm e record eka aithi employee ta samanada
            // balanwa
            Employee extEmployeeMobile = dao.getEmployeeByMobile(employee.getMobile());
            if (extEmployeeMobile != null && extEmployeeMobile.getId() != employee.getId()) {
                return "Update not completed : Mobile no already existing..!";
            }
            Employee extEmployeeNic = dao.getEmployeeByNIC(employee.getNic());
            if (extEmployeeNic != null && extEmployeeNic.getId() != employee.getId()) {
                return "Update not completed : NIC no already existing..!";
            }
    
            // dan modify date eka up karanawa e wgema employee wa save krnawa
            try {
                employee.setLastmodifydatetime(LocalDateTime.now().toLocalDate());
                dao.save(employee);
                // user kenekge working status eka arenna eya resign or deletede status ekakata
                // maru unoth
                // delete button eken, delete option eken wgema status eka update karana ekenut
                // apita userge status
                // eka maru karagnna puluwan wenna one
                if (employee.getEmployeestatus_id().getName().equals("Resign") ||
                        employee.getEmployeestatus_id().getName().equals("Deleted")) {
                    User extUser = userDao.getUserByEmployeeId(employee.getId());
                    if (extUser != null) {
                        extUser.setStatus(false);
                        userDao.save(extUser);
                    }
                }
    
                return "OK";
            } catch (Exception e) {
                return "Update not completed" + e.getMessage();
            }
        } else {
            return "You have not permissions to insert a new employee";
        }

    }

}
