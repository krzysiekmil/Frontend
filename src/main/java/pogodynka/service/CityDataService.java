package pogodynka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pogodynka.model.CityData;
import pogodynka.repository.CityDataRepository;


import java.util.LinkedList;
import java.util.List;

@Service
public class CityDataService {
    @Autowired
    CityDataRepository cityDataRepository;

    public List<CityData> listAll (){
        List<CityData>cities=new LinkedList<>();
        cityDataRepository.findAll().forEach(cities::add);
        return cities;
    }



}


