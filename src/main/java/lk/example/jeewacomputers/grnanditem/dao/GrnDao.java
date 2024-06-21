package lk.example.jeewacomputers.grnanditem.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import lk.example.jeewacomputers.grnanditem.entity.Grn;
import lk.example.jeewacomputers.grnanditem.entity.GrnHasCategory;
import lk.example.jeewacomputers.user.entity.User;


public interface GrnDao extends JpaRepository<Grn, Integer> {

    @Query(value = "select g from Grn g where g.purchase_id.id = ?1")
    public Grn getPurchaseOrdersWithCode(Integer purchase_id);

    // @Query(value = "SELECT * FROM jeewacomputersproject.grn where id = ?1", nativeQuery = true)
    // public Optional<Grn> getGrnIdByPurchaseId(Integer id);

    @Query(value = "SELECT * FROM jeewacomputersproject.grn where id = ?1", nativeQuery = true)
    public Grn getGrnIdByPurchaseId(Integer id);

    @Query(value = "SELECT * FROM jeewacomputersproject.grn_has_category where grn_id =?1", nativeQuery = true)
    public GrnHasCategory getGrnHasCategoryByGrnid(Integer grn_id);

    @Query(value = "SELECT max(id) FROM jeewacomputersproject.grn", nativeQuery = true)
    public Integer getMaxGrnId();

    @Query("select u from User u where u.username = ?1")
    public User getUsersByUsername(String username);

    // SELECT qty FROM %s WHERE name = ?1
    //select u from #{#entityName} u where u.lastname = ?1

    // @Query("select c.qty from #{#entityName} c where c.name = ?1")
    // public Integer getQty(String catname,String itemname);


} 
