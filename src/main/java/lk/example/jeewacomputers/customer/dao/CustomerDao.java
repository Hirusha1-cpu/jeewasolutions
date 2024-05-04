package lk.example.jeewacomputers.customer.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.customer.entity.Customer;

public interface CustomerDao extends JpaRepository<Customer, Integer>{
    
}
