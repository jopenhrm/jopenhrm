package com.jopenhrm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.jopenhrm.domain.enumeration.CompanySize;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "logo")
    private String logo;

    @Column(name = "website")
    private String website;

    @Column(name = "fax")
    private String fax;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_size")
    private CompanySize companySize;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "update_date")
    private ZonedDateTime updateDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Address primaryAddress;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BusinessDomain> businessDomains = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public Company logo(String logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getWebsite() {
        return website;
    }

    public Company website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getFax() {
        return fax;
    }

    public Company fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Company phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public CompanySize getCompanySize() {
        return companySize;
    }

    public Company companySize(CompanySize companySize) {
        this.companySize = companySize;
        return this;
    }

    public void setCompanySize(CompanySize companySize) {
        this.companySize = companySize;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Company createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getUpdateDate() {
        return updateDate;
    }

    public Company updateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public Address getPrimaryAddress() {
        return primaryAddress;
    }

    public Company primaryAddress(Address address) {
        this.primaryAddress = address;
        return this;
    }

    public void setPrimaryAddress(Address address) {
        this.primaryAddress = address;
    }

    public Set<BusinessDomain> getBusinessDomains() {
        return businessDomains;
    }

    public Company businessDomains(Set<BusinessDomain> businessDomains) {
        this.businessDomains = businessDomains;
        return this;
    }

    public Company addBusinessDomains(BusinessDomain businessDomain) {
        this.businessDomains.add(businessDomain);
        businessDomain.setCompany(this);
        return this;
    }

    public Company removeBusinessDomains(BusinessDomain businessDomain) {
        this.businessDomains.remove(businessDomain);
        businessDomain.setCompany(null);
        return this;
    }

    public void setBusinessDomains(Set<BusinessDomain> businessDomains) {
        this.businessDomains = businessDomains;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Company company = (Company) o;
        if (company.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), company.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logo='" + getLogo() + "'" +
            ", website='" + getWebsite() + "'" +
            ", fax='" + getFax() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", companySize='" + getCompanySize() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
