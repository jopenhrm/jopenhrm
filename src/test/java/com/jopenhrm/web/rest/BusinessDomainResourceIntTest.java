package com.jopenhrm.web.rest;

import com.jopenhrm.JopenhrmApp;

import com.jopenhrm.domain.BusinessDomain;
import com.jopenhrm.repository.BusinessDomainRepository;
import com.jopenhrm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.jopenhrm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BusinessDomainResource REST controller.
 *
 * @see BusinessDomainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JopenhrmApp.class)
public class BusinessDomainResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private BusinessDomainRepository businessDomainRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusinessDomainMockMvc;

    private BusinessDomain businessDomain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusinessDomainResource businessDomainResource = new BusinessDomainResource(businessDomainRepository);
        this.restBusinessDomainMockMvc = MockMvcBuilders.standaloneSetup(businessDomainResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessDomain createEntity(EntityManager em) {
        BusinessDomain businessDomain = new BusinessDomain()
            .name(DEFAULT_NAME);
        return businessDomain;
    }

    @Before
    public void initTest() {
        businessDomain = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessDomain() throws Exception {
        int databaseSizeBeforeCreate = businessDomainRepository.findAll().size();

        // Create the BusinessDomain
        restBusinessDomainMockMvc.perform(post("/api/business-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDomain)))
            .andExpect(status().isCreated());

        // Validate the BusinessDomain in the database
        List<BusinessDomain> businessDomainList = businessDomainRepository.findAll();
        assertThat(businessDomainList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessDomain testBusinessDomain = businessDomainList.get(businessDomainList.size() - 1);
        assertThat(testBusinessDomain.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createBusinessDomainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessDomainRepository.findAll().size();

        // Create the BusinessDomain with an existing ID
        businessDomain.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessDomainMockMvc.perform(post("/api/business-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDomain)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessDomain in the database
        List<BusinessDomain> businessDomainList = businessDomainRepository.findAll();
        assertThat(businessDomainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBusinessDomains() throws Exception {
        // Initialize the database
        businessDomainRepository.saveAndFlush(businessDomain);

        // Get all the businessDomainList
        restBusinessDomainMockMvc.perform(get("/api/business-domains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessDomain.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getBusinessDomain() throws Exception {
        // Initialize the database
        businessDomainRepository.saveAndFlush(businessDomain);

        // Get the businessDomain
        restBusinessDomainMockMvc.perform(get("/api/business-domains/{id}", businessDomain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(businessDomain.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBusinessDomain() throws Exception {
        // Get the businessDomain
        restBusinessDomainMockMvc.perform(get("/api/business-domains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessDomain() throws Exception {
        // Initialize the database
        businessDomainRepository.saveAndFlush(businessDomain);

        int databaseSizeBeforeUpdate = businessDomainRepository.findAll().size();

        // Update the businessDomain
        BusinessDomain updatedBusinessDomain = businessDomainRepository.findById(businessDomain.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessDomain are not directly saved in db
        em.detach(updatedBusinessDomain);
        updatedBusinessDomain
            .name(UPDATED_NAME);

        restBusinessDomainMockMvc.perform(put("/api/business-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusinessDomain)))
            .andExpect(status().isOk());

        // Validate the BusinessDomain in the database
        List<BusinessDomain> businessDomainList = businessDomainRepository.findAll();
        assertThat(businessDomainList).hasSize(databaseSizeBeforeUpdate);
        BusinessDomain testBusinessDomain = businessDomainList.get(businessDomainList.size() - 1);
        assertThat(testBusinessDomain.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessDomain() throws Exception {
        int databaseSizeBeforeUpdate = businessDomainRepository.findAll().size();

        // Create the BusinessDomain

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restBusinessDomainMockMvc.perform(put("/api/business-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDomain)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessDomain in the database
        List<BusinessDomain> businessDomainList = businessDomainRepository.findAll();
        assertThat(businessDomainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessDomain() throws Exception {
        // Initialize the database
        businessDomainRepository.saveAndFlush(businessDomain);

        int databaseSizeBeforeDelete = businessDomainRepository.findAll().size();

        // Get the businessDomain
        restBusinessDomainMockMvc.perform(delete("/api/business-domains/{id}", businessDomain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BusinessDomain> businessDomainList = businessDomainRepository.findAll();
        assertThat(businessDomainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessDomain.class);
        BusinessDomain businessDomain1 = new BusinessDomain();
        businessDomain1.setId(1L);
        BusinessDomain businessDomain2 = new BusinessDomain();
        businessDomain2.setId(businessDomain1.getId());
        assertThat(businessDomain1).isEqualTo(businessDomain2);
        businessDomain2.setId(2L);
        assertThat(businessDomain1).isNotEqualTo(businessDomain2);
        businessDomain1.setId(null);
        assertThat(businessDomain1).isNotEqualTo(businessDomain2);
    }
}
