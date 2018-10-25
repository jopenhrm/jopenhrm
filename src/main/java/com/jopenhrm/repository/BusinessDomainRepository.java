package com.jopenhrm.repository;

import com.jopenhrm.domain.BusinessDomain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BusinessDomain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessDomainRepository extends JpaRepository<BusinessDomain, Long> {

}
