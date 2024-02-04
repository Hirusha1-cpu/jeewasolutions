package lk.example.jeewacomputers.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import lk.example.jeewacomputers.employee.entity.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Integer> {
    //define query for getnext employee number
    @Query(value = "SELECT lpad(max(e.empno)+1,8,0) as empno FROM jeewacomputersproject.employee as e;", nativeQuery = true)
    public String getNextEmpNo();

    //define query for get getEmployeeListWithoutUserAccount
    // @Query(value = "SELECT e FROM Employee e WHERE e.id not in (select u.employee_id from User u);")
    // public List<Employee> getEmployeeListWithoutUserAccount();

    @Query(value = "SELECT * FROM jeewacomputersproject.employee as e where e.id NOT IN(SELECT employee_id FROM jeewacomputersproject.user);", nativeQuery = true)
    public List<Employee> getEmployeeListWithoutUserAccount();


    
}
