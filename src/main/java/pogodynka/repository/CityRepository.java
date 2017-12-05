package pogodynka.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pogodynka.model.City;

import java.util.List;


public interface CityRepository extends JpaRepository<City,Long>
{
     boolean existsByName(String name);
     @Query(value = "SELECT * FROM city",nativeQuery = true)
     List<City> findAll();
     City findByName(String name);
}
