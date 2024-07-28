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
    @Query(value = "select  ca.name as category,count(se.id) as itemcount from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id inner join jeewacomputersproject.category as ca on ca.id = se.category_id  where s.datetime between ?1 and ?2 group by ca.id;", nativeQuery = true)
    String[][] getCategoryViceItemCountGivenDateRange(String sd, String ed);

    // particular daterange ekaka wikununa daily
    @Query(value = "select date(s.datetime) as date,sum(se.itemprice) as sales  from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id inner join jeewacomputersproject.category as ca on ca.id = se.category_id  where s.datetime between ?1 and ?2 group by date(s.datetime),MONTH(s.datetime), YEAR(s.datetime);", nativeQuery = true)
    String[][] getTotalDailyGivenDateRange(String sd, String ed);

    // particular daterange ekaka wikununa weekly
    @Query(value = "select week(s.datetime) as date,sum(se.itemprice) as sales  from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id inner join jeewacomputersproject.category as ca on ca.id = se.category_id  where s.datetime between ?1 and ?2 group by date(s.datetime),week(s.datetime),MONTH(s.datetime), YEAR(s.datetime);", nativeQuery = true)
    String[][] getTotalWeekGivenDateRange(String sd, String ed);

    // particular daterange ekaka wikununa weekly
    @Query(value = "select monthname(s.datetime) as date,sum(se.itemprice) as sales  from jeewacomputersproject.sales_has_serialno AS ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join jeewacomputersproject.customer as c on s.customer_id = c.id inner join jeewacomputersproject.category as ca on ca.id = se.category_id  where s.datetime between ?1 and ?2 group by date(s.datetime),week(s.datetime),monthname(s.datetime), YEAR(s.datetime);", nativeQuery = true)
    String[][] getTotalMonthlyGivenDateRange(String sd, String ed);

    // SELECT ct.customertypes, COUNT(*) AS customer_count FROM
    // jeewacomputersproject.customer as c inner join
    // jeewacomputersproject.customertype as ct on c.customertype_id = ct.id group
    // by ct.customertypes;
    @Query(value = "SELECT ct.customertypes, COUNT(*) AS customer_count FROM jeewacomputersproject.customer as c inner join jeewacomputersproject.customertype as ct on c.customertype_id = ct.id group by ct.customertypes;", nativeQuery = true)
    String[][] getCustomerTypeViceCounts();

    @Query(value = "SELECT statusofrepair, count(*) as count FROM jeewacomputersproject.due_to_repairitem as dr group by dr.statusofrepair;", nativeQuery = true)
    String[][] getDueRepairTypeCount();

    @Query(value = " SELECT SUM(se.itemprice) AS total_sales,\n" + //
            "\tmonthname(s.datetime) AS month_name\n" + //
            "\n" + //
            "     FROM jeewacomputersproject.sales_has_serialno AS ss\n" + //
            "     INNER JOIN jeewacomputersproject.sales AS s ON ss.sales_id = s.id\n" + //
            "\tINNER JOIN jeewacomputersproject.serialno AS se ON ss.serialno_id = se.id\n" + //
            "     INNER JOIN jeewacomputersproject.customer AS c ON s.customer_id = c.id\n" + //
            "\tINNER JOIN jeewacomputersproject.category AS ca ON ca.id = se.category_id\n" + //
            "     WHERE s.datetime \n" + //
            "     GROUP BY MONTH(s.datetime), monthname(s.datetime),YEAR(s.datetime), weekofyear(s.datetime);", nativeQuery = true)
    String[][] getMonthlySale();

    // @Query(value = " SELECT SUM(se.itemprice) AS total_sales,\n" + //
    //         "\tweek(s.datetime) AS week\n" + //
    //         "\n" + //
    //         "     FROM jeewacomputersproject.sales_has_serialno AS ss\n" + //
    //         "     INNER JOIN jeewacomputersproject.sales AS s ON ss.sales_id = s.id\n" + //
    //         "\tINNER JOIN jeewacomputersproject.serialno AS se ON ss.serialno_id = se.id\n" + //
    //         "     INNER JOIN jeewacomputersproject.customer AS c ON s.customer_id = c.id\n" + //
    //         "\tINNER JOIN jeewacomputersproject.category AS ca ON ca.id = se.category_id\n" + //
    //         "     WHERE s.datetime \n" + //
    //         "     GROUP BY MONTH(s.datetime), monthname(s.datetime),YEAR(s.datetime), week(s.datetime);", nativeQuery = true)
    // String[][] getWeeklySale();

    @Query(value = "SELECT SUM(se.itemprice) AS total_sales,WEEK(s.datetime) AS week,MIN(DATE_ADD(s.datetime, INTERVAL(1 - DAYOFWEEK(s.datetime)) DAY)) AS week_start,MAX(DATE_ADD(s.datetime, INTERVAL(7 - DAYOFWEEK(s.datetime)) DAY)) AS week_end FROM jeewacomputersproject.sales_has_serialno AS ss INNER JOIN jeewacomputersproject.sales AS s ON ss.sales_id = s.id INNER JOIN jeewacomputersproject.serialno AS se ON ss.serialno_id = se.id INNER JOIN jeewacomputersproject.customer AS c ON s.customer_id = c.id INNER JOIN jeewacomputersproject.category AS ca ON ca.id = se.category_id GROUP BY YEAR(s.datetime), WEEK(s.datetime);", nativeQuery = true)
    String[][] getWeeklySale();

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
    // select se.itemname from jeewacomputersproject.sales_has_serialno AS ss inner
    // join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join
    // jeewacomputersproject.serialno AS se on ss.serialno_id = se.id where
    // s.datetime between '2024-06-29' and '2024-06-30';

    // (customer) gatta (badu) eyage namat ekka particular date range ekaka
    // select c.name, se.itemname from jeewacomputersproject.sales_has_serialno AS
    // ss inner join jeewacomputersproject.sales AS s on ss.sales_id = s.id inner
    // join jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner
    // join jeewacomputersproject.customer as c on s.customer_id = c.id where
    // s.datetime between '2024-06-29' and '2024-06-30';

    // (cutomer) gatta (item count) eka particular date range ekaka
    // select c.name as name, count(se.itemname) // sum(se.itemprice) as item from
    // jeewacomputersproject.sales_has_serialno AS ss inner join
    // jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join
    // jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join
    // jeewacomputersproject.customer as c on s.customer_id = c.id where s.datetime
    // between '2024-06-29' and '2024-06-30' GROUP BY c.name;

    // paricular date range ekaka mona hari category ekk wikununa wara ganana
    // select count(se.id) as itemcount from
    // jeewacomputersproject.sales_has_serialno AS ss inner join
    // jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join
    // jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join
    // jeewacomputersproject.customer as c on s.customer_id = c.id where s.datetime
    // between '2024-06-29' and '2024-06-30' and se.category_id in (select id from
    // jeewacomputersproject.category where name = "laptop");

    // particular date range ekaka wikununa (category) and (count) eka
    // select count(se.id) as itemcount, ca.name as category from
    // jeewacomputersproject.sales_has_serialno AS ss inner join
    // jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join
    // jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join
    // jeewacomputersproject.customer as c on s.customer_id = c.id inner join
    // jeewacomputersproject.category as ca on ca.id = se.category_id where
    // s.datetime between '2024-06-29' and '2024-06-30' group by ca.id;

    // weekly and yearly sales
    // SELECT SUM(se.itemprice) AS total_sales,
    // MONTH(s.datetime) AS month_number,
    // YEAR(s.datetime) AS year
    // FROM jeewacomputersproject.sales_has_serialno AS ss
    // INNER JOIN jeewacomputersproject.sales AS s ON ss.sales_id = s.id
    // INNER JOIN jeewacomputersproject.serialno AS se ON ss.serialno_id = se.id
    // INNER JOIN jeewacomputersproject.customer AS c ON s.customer_id = c.id
    // INNER JOIN jeewacomputersproject.category AS ca ON ca.id = se.category_id
    // WHERE s.datetime BETWEEN '2024-06-29' AND '2024-06-30'
    // GROUP BY MONTH(s.datetime), YEAR(s.datetime);

    // daily sales
    // select sum(se.itemprice) as sales, date(s.datetime) as date from
    // jeewacomputersproject.sales_has_serialno AS ss inner join
    // jeewacomputersproject.sales AS s on ss.sales_id = s.id inner join
    // jeewacomputersproject.serialno AS se on ss.serialno_id = se.id inner join
    // jeewacomputersproject.customer as c on s.customer_id = c.id inner join
    // jeewacomputersproject.category as ca on ca.id = se.category_id where
    // s.datetime between '2024-06-29' and '2024-06-30' group by
    // date(s.datetime),MONTH(s.datetime), YEAR(s.datetime);

}
