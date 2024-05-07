package lk.example.jeewacomputers.customer.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.customer.entity.Customer;

public interface CustomerDao extends JpaRepository<Customer, Integer>{
    @Query(value = "SELECT * FROM jeewacomputersproject.customer where phone = ?1", nativeQuery = true)
    public Customer getCustomerByPhone(String phone);

    
}
