package lk.example.jeewacomputers.customer.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.customer.entity.CustomerType;

public interface CustomerTypeDao extends JpaRepository<CustomerType, Integer> {

    @Query(value = "SELECT * FROM jeewacomputersproject.customertype where customertypes =?1", nativeQuery = true)
    public CustomerType getCusTypeDetails(String customertypes);
    
   
} 