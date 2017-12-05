package pogodynka.step.cityStep;

import java.util.Map;

public class CityDataDto {
    String currentCity;
    Map<String, Object> cityData;

    public CityDataDto(String currentCity, Map<String, Object> cityData) {
        this.currentCity = currentCity;
        this.cityData = cityData;
    }

    public String getCurrentCity() {
        return currentCity;
    }

    public void setCurrentCity(String currentCity) {
        this.currentCity = currentCity;
    }

    public Map<String, Object> getCityData() {
        return cityData;
    }

    public void setCityData(Map<String, Object> cityData) {
        this.cityData = cityData;
    }
}
