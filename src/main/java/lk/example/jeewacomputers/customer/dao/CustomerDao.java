package lk.example.jeewacomputers.customer.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.customer.entity.CustomerType;

public interface CustomerDao extends JpaRepository<Customer, Integer>{
    @Query(value = "SELECT c FROM Customer c where c.phone = ?1")
    public Customer getCustomerByPhone(String phone);

    @Query(value = "SELECT * FROM jeewacomputersproject.customer where buyrounds > ?1", nativeQuery = true)
    public Customer getCustomerBuyRounds(Integer buyrounds);

    @Query(value = "SELECT * FROM jeewacomputersproject.customer where repairs > ?1", nativeQuery = true)
    public Customer getCustomerRepairs(Integer repairs);

    @Query(value = "select ct FROM CustomerType ct where ct.customertypes = 'premium'")
    public CustomerType getPremiumBuyRounds();

    @Query(value = "select ct FROM CustomerType ct where ct.customertypes = '1st Stage'")
    public CustomerType getFirstStageBuyRounds();

    @Query(value = "select ct FROM CustomerType ct where ct.customertypes = '2nd Stage'")
    public CustomerType getSecondStageBuyRounds();

    // @Query(value = "SELECT * FROM jeewacomputersproject.customertype where customertypes = 'Normal'", nativeQuery = true)
    // public CustomerType getNormalBuyRounds();

    @Query(value = "select ct FROM CustomerType ct where ct.customertypes = 'Normal'")
    public CustomerType getNormalBuyRounds();


    // SELECT * FROM jeewacomputersproject.customer where customertype_id in (select id FROM jeewacomputersproject.customertype where customertypes = "premium");
    @Query(value = "select c FROM Customer c where c.customerType.id in (select ct FROM CustomerType ct where ct.customertypes = 'Normal' )")
    public List<Customer> getCustomersByType();

    // @Query(value = "SELECT ct.* FROM jeewacomputersproject.customertype ct INNER JOIN jeewacomputersproject.customer c ON ct.id = c.customertype_id WHERE c.name = ?1", nativeQuery = true)
    // @Query(value = "SELECT * FROM jeewacomputersproject.customertype where id in (SELECT customertype_id FROM jeewacomputersproject.customer where name =?1)", nativeQuery = true)
    @Query("SELECT ct FROM CustomerType ct WHERE ct.id IN (SELECT c.customerType.id FROM Customer c WHERE c.name = ?1)")
    public CustomerType getCustomerTypeByName(String name);

    // SELECT * FROM jeewacomputersproject.customertype where id in (SELECT customertype_id FROM jeewacomputersproject.customer where name ="Elon Musk");
    @Query(value = "SELECT count(*) FROM jeewacomputersproject.customer where customertype_id IN (SELECT id FROM jeewacomputersproject.customertype where customertypes =?1 );", nativeQuery = true)
    public Integer getCustomerCount(String customertypes);



    @Query(value = "SELECT * FROM jeewacomputersproject.customer where customertype_id IN (SELECT id FROM jeewacomputersproject.customertype where customertypes =?1 ) ;", nativeQuery = true)
    public List<Customer> getCustomersByCustomerType(String customertypes);

//  SELECT * FROM jeewacomputersproject.serialno s INNER JOIN jeewacomputersproject.sales_has_serialno ss ON s.id = ss.serialno_id INNER JOIN jeewacomputersproject.sales sa ON sa.id = ss.sales_id WHERE sa.customer_id = (SELECT id FROM jeewacomputersproject.customer WHERE name = "Elon Musk");

// SELECT *
// FROM jeewacomputersproject.serialno s
// INNER JOIN jeewacomputersproject.sales_has_serialno ss ON s.id = ss.serialno_id
// INNER JOIN jeewacomputersproject.sales sa ON sa.id = ss.sales_id  -- Join with sales table directly
// WHERE sa.customer_id = (SELECT id FROM jeewacomputersproject.customer WHERE name = "Elon Musk");
}
