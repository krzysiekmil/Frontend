package pogodynka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pogodynka.repository.AppUserRepository;

@Service
public class AppUserService {
    @Autowired
    private AppUserRepository appUserRepository;

}
