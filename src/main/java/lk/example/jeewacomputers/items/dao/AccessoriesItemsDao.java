package lk.example.jeewacomputers.items.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.example.jeewacomputers.grnanditem.entity.Accessories;
import lk.example.jeewacomputers.items.entity.AccessoriesItems;

public interface AccessoriesItemsDao extends JpaRepository<AccessoriesItems, Integer>  {
    
}
