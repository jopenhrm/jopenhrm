package com.jopenhrm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jopenhrm.domain.BusinessDomain;
import com.jopenhrm.repository.BusinessDomainRepository;
import com.jopenhrm.web.rest.errors.BadRequestAlertException;
import com.jopenhrm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BusinessDomain.
 */
@RestController
@RequestMapping("/api")
public class BusinessDomainResource {

    private final Logger log = LoggerFactory.getLogger(BusinessDomainResource.class);

    private static final String ENTITY_NAME = "businessDomain";

    private final BusinessDomainRepository businessDomainRepository;

    public BusinessDomainResource(BusinessDomainRepository businessDomainRepository) {
        this.businessDomainRepository = businessDomainRepository;
    }

    /**
     * POST  /business-domains : Create a new businessDomain.
     *
     * @param businessDomain the businessDomain to create
     * @return the ResponseEntity with status 201 (Created) and with body the new businessDomain, or with status 400 (Bad Request) if the businessDomain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/business-domains")
    @Timed
    public ResponseEntity<BusinessDomain> createBusinessDomain(@RequestBody BusinessDomain businessDomain) throws URISyntaxException {
        log.debug("REST request to save BusinessDomain : {}", businessDomain);
        if (businessDomain.getId() != null) {
            throw new BadRequestAlertException("A new businessDomain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessDomain result = businessDomainRepository.save(businessDomain);
        return ResponseEntity.created(new URI("/api/business-domains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /business-domains : Updates an existing businessDomain.
     *
     * @param businessDomain the businessDomain to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated businessDomain,
     * or with status 400 (Bad Request) if the businessDomain is not valid,
     * or with status 500 (Internal Server Error) if the businessDomain couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/business-domains")
    @Timed
    public ResponseEntity<BusinessDomain> updateBusinessDomain(@RequestBody BusinessDomain businessDomain) throws URISyntaxException {
        log.debug("REST request to update BusinessDomain : {}", businessDomain);
        if (businessDomain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessDomain result = businessDomainRepository.save(businessDomain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, businessDomain.getId().toString()))
            .body(result);
    }

    /**
     * GET  /business-domains : get all the businessDomains.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of businessDomains in body
     */
    @GetMapping("/business-domains")
    @Timed
    public List<BusinessDomain> getAllBusinessDomains() {
        log.debug("REST request to get all BusinessDomains");
        return businessDomainRepository.findAll();
    }

    /**
     * GET  /business-domains/:id : get the "id" businessDomain.
     *
     * @param id the id of the businessDomain to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the businessDomain, or with status 404 (Not Found)
     */
    @GetMapping("/business-domains/{id}")
    @Timed
    public ResponseEntity<BusinessDomain> getBusinessDomain(@PathVariable Long id) {
        log.debug("REST request to get BusinessDomain : {}", id);
        Optional<BusinessDomain> businessDomain = businessDomainRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(businessDomain);
    }

    /**
     * DELETE  /business-domains/:id : delete the "id" businessDomain.
     *
     * @param id the id of the businessDomain to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/business-domains/{id}")
    @Timed
    public ResponseEntity<Void> deleteBusinessDomain(@PathVariable Long id) {
        log.debug("REST request to delete BusinessDomain : {}", id);

        businessDomainRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
