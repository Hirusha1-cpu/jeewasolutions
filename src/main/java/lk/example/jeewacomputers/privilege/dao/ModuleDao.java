package lk.example.jeewacomputers.privilege.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ModuleDao extends JpaRepository<lk.example.jeewacomputers.privilege.entity.Module, Integer > {

     @Query("select m from Module m where m.id not in (select p.module_id.id from Privilege p where p.role_id.id=?1)")
    public List<lk.example.jeewacomputers.privilege.entity.Module> getModuleByRole(Integer roleid);
} 