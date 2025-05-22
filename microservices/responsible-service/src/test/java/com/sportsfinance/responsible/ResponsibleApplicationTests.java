package com.sportsfinance.responsible;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
class ResponsibleApplicationTests {
	@Test
	void contextLoads() {
		assertDoesNotThrow(() -> ResponsibleApplication.main(new String[] {}));
	}
}
