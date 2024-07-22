package lk.example.jeewacomputers.report.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.employee.entity.Employee;

import java.util.*;

public interface ReportDao extends JpaRepository<Employee, Integer> {
    @Query(value = "select e from Employee e where e.employeestatus_id.id = 1")
    List<Employee> workingEmployeeList();

    @Query(value = "select e from Employee e where e.employeestatus_id.id = ?1 and e.designation_id.id = ?2")
    List<Employee> employeesListByStatusandDesination(Integer status, Integer designation);

    // particular daterange ekaka wikununa category and item count eka
    @Query(value = "select count(se.id) as itemcount, ca.name as category from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id inner join jeewacomputersproject.category as ca on ca.id = se.category_id  where s.datetime between '2024-06-29' and '2024-06-30' group by ca.id;",nativeQuery = true)
    String[][] getCategoryViceItemCountGivenDateRange();

    // select monthname(s.addeddate) => week, year
    // select s.itemname,sum(b.orderqty),count(b.orderqty) from
    // jee.s as s, jee.b as b, jee.c as c where s.id = b.id and b.id = c.id between
    // '2024-01-01' and '2026-01-01'
    // group by s.id;
    // group by month(s.addeddate)

    // selected date range ekaka una sales and repairs, dekama ho wena wenama

    // SELECT count(dr.barcodeforrepair),count(s.invoiceno) FROM
    // jeewacomputersproject.sales_has_due_to_repairitem as sd inner join
    // jeewacomputersproject.due_to_repairitem as dr on sd.due_to_repairitem_id =
    // dr.id inner join jeewacomputersproject.sales as s on sd.sales_id = s.id where
    // dr.takendate and s.datetime between "2024-06-29" and "2024-06-30" ;

    // SELECT (dr.barcodeforrepair),(s.invoiceno) FROM
    // jeewacomputersproject.sales_has_due_to_repairitem as sd inner join
    // jeewacomputersproject.due_to_repairitem as dr on sd.due_to_repairitem_id =
    // dr.id inner join jeewacomputersproject.sales as s on sd.sales_id = s.id where
    // dr.takendate and s.datetime between "2024-06-29" and "2024-06-30" ;

    // me date range eke wikinuna badu monada

    // SELECT ss.*, s.*, se.*
    // FROM jeewacomputersproject.sales_has_serialno AS ss
    // INNER JOIN jeewacomputersproject.sales AS s ON ss.sales_id = s.id
    // INNER JOIN jeewacomputersproject.serialno AS se ON ss.serialno_id = se.id
    // WHERE s.datetime BETWEEN '2024-01-01' AND '2026-01-01';
    // select se.itemname from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id where s.datetime between '2024-06-29' and '2024-06-30';

    // (customer) gatta (badu) eyage namat ekka particular date range ekaka
    // select c.name, se.itemname from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id  where s.datetime between '2024-06-29' and '2024-06-30';

    // (cutomer) gatta (item count) eka particular date range ekaka
    //select c.name as name, count(se.itemname) // sum(se.itemprice) as item from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id  where s.datetime between '2024-06-29' and '2024-06-30' GROUP BY c.name;

    // paricular date range ekaka mona hari category ekk wikununa wara ganana
    // select count(se.id) as itemcount from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id  where s.datetime between '2024-06-29' and '2024-06-30' and se.category_id in (select id from jeewacomputersproject.category where name = "laptop");

    // particular date range ekaka wikununa (category) and (count) eka
    // select count(se.id) as itemcount, ca.name as category from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id inner join jeewacomputersproject.category as ca on ca.id = se.category_id  where s.datetime between '2024-06-29' and '2024-06-30' group by ca.id;



}
