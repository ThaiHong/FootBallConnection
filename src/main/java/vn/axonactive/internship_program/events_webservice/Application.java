package vn.axonactive.internship_program.events_webservice;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.scheduling.annotation.EnableAsync;
import vn.axonactive.internship_program.events_webservice.common.CommonPath;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URISyntaxException;

@SpringBootApplication
@EnableAsync
public class Application extends SpringBootServletInitializer {
	FirebaseOptions options;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		String enviroment = System.getenv("ENV");

		if (!"local".equals(enviroment)) {
			try {
				options = new FirebaseOptions.Builder()
						.setServiceAccount(new FileInputStream(CommonPath.staticPath() + "/awesome-events-71f14-firebase-adminsdk-eevpu-38e70c834b.json"))
						.setDatabaseUrl("https://awesome-events-71f14.firebaseio.com/")
						.build();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
			FirebaseApp.initializeApp(options);
		}
		CommonPath.initCreatePath();
		return application.sources(Application.class).properties("spring.config.name:"+enviroment);
	}



	public static void main(String[] args) {
		new SpringApplicationBuilder(Application.class, args);
	}

	@Bean(name = "messageSource")
	public ReloadableResourceBundleMessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageBundle = new ReloadableResourceBundleMessageSource();
		messageBundle.setBasename("classpath:messages/messages");
		messageBundle.setDefaultEncoding("UTF-8");
		return messageBundle;
	}


}
