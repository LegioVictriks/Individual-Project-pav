package intent.bck;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BckApplication {

	public static void main(String[] args) {
		SpringApplication.run(BckApplication.class, args);
	}

	@GetMapping("/")
	public String index() {
		return "Backend is running!";
	}

	@GetMapping("/home")
	public String home() {
		return "Home.jsx";
	}
}