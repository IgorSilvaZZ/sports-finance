package com.sportsfinance.responsible.domain.service;

import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;
import com.sportsfinance.responsible.api.mapper.ResponsibleMapper;
import com.sportsfinance.responsible.config.security.PasswordEncrypt;
import com.sportsfinance.responsible.domain.model.Responsible;
import com.sportsfinance.responsible.domain.repository.ResponsibleRepository;
import com.sportsfinance.responsible.exception.AlreadyExistsException;
import com.sportsfinance.responsible.exception.UnauthorizedException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.openMocks;

class ResponsibleServiceImplTest {

    public static final String NAME = "name";
    public static final String MAIL = "mail";
    public static final String PASSWORD_FAKE = "password";
    public static final String PASSWORD_ENCRYPT = PasswordEncrypt.encoder(PASSWORD_FAKE);
    public static final String PHONE = "phone";
    public static final String AVATAR = "avatar";

    private AuthenticateResponsibleDTO authenticateResponsibleDTO = new AuthenticateResponsibleDTO();
    private CreateResponsibleDTO createResponsibleDTO = new CreateResponsibleDTO();
    private Responsible responsible = new Responsible();

    @InjectMocks
    private ResponsibleServiceImpl responsibleService;

    @Mock
    private ResponsibleRepository responsibleRepository;

    @Mock
    private ResponsibleMapper responsibleMapper;

    @BeforeEach
    void setUp() {
        openMocks(this);
        this.startDomains();
    }

    @Test
    void whenCreateResponsibleThenReturnAnCreateResponsibleDTO() {
        when(this.responsibleRepository.findByEmail(any())).thenReturn(null);
        when(this.responsibleMapper.toResponsible(any())).thenReturn(this.responsible);
        when(this.responsibleRepository.save(any())).thenReturn(this.responsible);
        when(this.responsibleMapper.toCreateResponsibleDTO(any())).thenReturn(this.createResponsibleDTO);

        CreateResponsibleDTO createTest = this.responsibleService.createResponsible(this.createResponsibleDTO);

        assertNotNull(createTest);
        assertEquals(CreateResponsibleDTO.class, createTest.getClass());
        assertTrue(PasswordEncrypt.decoder(PASSWORD_FAKE, createTest.getPassword()));
        verify(this.responsibleRepository, times(1)).save(any());
    }

    @Test
    void whenCreateResponsibleExistingThenThrowAnAlreadyExistsException() {
        when(this.responsibleRepository.findByEmail(any())).thenReturn(this.responsible);

        try {
            this.responsibleService.createResponsible(this.createResponsibleDTO);
            assertEquals(0, 1);
        } catch (Exception ex) {
            assertEquals(AlreadyExistsException.class, ex.getClass());
            assertEquals("Responsible already exists", ex.getMessage());
        }
    }

    @Test
    void whenAuthenticateResponsibleThenReturnAnAuthenticateResponsibleDTO() {
        when(this.responsibleRepository.findByEmail(any())).thenReturn(this.responsible);
        when(this.responsibleMapper.toAuthenticateResponsibleDTO(any())).thenReturn(this.authenticateResponsibleDTO);

        AuthenticateResponsibleDTO authenticateTest = this.responsibleService.authenticateResponsible(this.authenticateResponsibleDTO);

        assertNotNull(authenticateTest);
        assertEquals(AuthenticateResponsibleDTO.class, authenticateTest.getClass());
    }

    @Test
    void whenAuthenticateResponsibleNotExistingThenThrowAnUnauthorizedException() {
        when(this.responsibleRepository.findByEmail(any())).thenReturn(null);

        try {
            this.responsibleService.authenticateResponsible(this.authenticateResponsibleDTO);
            assertEquals(0, 1);
        } catch (Exception ex) {
            assertEquals(UnauthorizedException.class, ex.getClass());
            assertEquals("Email Incorrect", ex.getMessage());
        }
    }

    @Test
    void whenAuthenticateResponsibleWithPasswordWrongThenThrowAnUnauthorizedException() {
        when(this.responsibleRepository.findByEmail(any())).thenReturn(this.responsible);
        this.authenticateResponsibleDTO.setPassword("123");

        try {
            this.responsibleService.authenticateResponsible(this.authenticateResponsibleDTO);
            assertEquals(0, 1);
        } catch (Exception ex) {
            assertEquals(UnauthorizedException.class, ex.getClass());
            assertEquals("Password Incorrect", ex.getMessage());
        }
    }

    private void startDomains() {
        this.authenticateResponsibleDTO = new AuthenticateResponsibleDTO(MAIL,PASSWORD_FAKE);
        this.createResponsibleDTO = new CreateResponsibleDTO(NAME, MAIL, PASSWORD_FAKE, PHONE, AVATAR);
        this.responsible = new Responsible(1L, NAME, MAIL, PASSWORD_ENCRYPT, PHONE, AVATAR, LocalDate.now(), LocalDate.now());
    }

}