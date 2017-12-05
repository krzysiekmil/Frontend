package pogodynka.step.cityStep;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import pogodynka.model.City;
import pogodynka.repository.CityRepository;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.*;
import java.util.stream.Collectors;

public class Reader implements ItemReader<CityDataDto> {
    @Autowired
    CityRepository cityRepository;
    private String city;
    private Iterator<String> cityIterator;
    private String currentCity;
    private Map<String,Object> cityData;

    private String readAll(java.io.Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public  JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }

    @Override
    public CityDataDto read() throws IOException, JSONException {
        if (!isInialized())
            initialize();

        if(cityIterator.hasNext()) {
            currentCity = cityIterator.next();
            String url = getWeatherUrl(currentCity);
            ObjectMapper om = new ObjectMapper();
            cityData= om.readValue(readJsonFromUrl(url).toString(), new TypeReference<Map<String, Object>>() {});
            return new CityDataDto(currentCity, cityData);
        } else {
            cityIterator = null;
        }

        return null;
    }

    private String getWeatherUrl(String currentCity) {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + currentCity + "%2C%20pol%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    }

    private void initialize() {
        if(cityIterator == null) {
            if(city != null)
                cityIterator = Arrays.asList(city).iterator();
            else {
                List<City> cityList = cityRepository.findAll();
                if(cityList != null)
                    cityIterator = cityList
                            .stream()
                            .map(City::getName)
                            .collect(Collectors.toList())
                            .iterator();
            }
        }
    }

    private boolean isInialized() {
        return cityIterator != null;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
