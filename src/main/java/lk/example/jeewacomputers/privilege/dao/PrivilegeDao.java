package lk.example.jeewacomputers.privilege.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.example.jeewacomputers.privilege.entity.Privilege;

public interface PrivilegeDao extends JpaRepository<Privilege, Integer> {

  // create query for get privilege object by given role id and module name
  @Query("select p from Privilege p where p.role_id = ?1 and p.module_id.id = ?2")
  Privilege getByRoleModule(Integer roleid, Integer moduleid);

  // create query for get privilege by given username and module name
  @Query(value = "SELECT bit_or(p.sel) as sel , bit_or(p.inst) as inst, bit_or(p.upd) as upd, bit_or(p.del) as del FROM bitproject123online.privilege as p where p.role_id in (select uhr.role_id from bitproject123online.user_has_role as uhr where uhr.user_id in (select u.id from bitproject123online.user as u where u.username=?1)) and p.module_id in (select m.id from bitproject123online.module as m where m.name=?2);", nativeQuery = true)
  public String getPrivilegeByUserModule(String username, String modulename);

}