package com.jopenhrm.service.dto;

import com.jopenhrm.domain.enumeration.CompanySize;

public class CompanyDTO {

    private String name;
    private String logo;
    private String website;
    private String fax;
    private String phoneNumber;
    private CompanySize companySize;
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the logo
	 */
	public String getLogo() {
		return logo;
	}
	/**
	 * @param logo the logo to set
	 */
	public void setLogo(String logo) {
		this.logo = logo;
	}
	/**
	 * @return the website
	 */
	public String getWebsite() {
		return website;
	}
	/**
	 * @param website the website to set
	 */
	public void setWebsite(String website) {
		this.website = website;
	}
	/**
	 * @return the fax
	 */
	public String getFax() {
		return fax;
	}
	/**
	 * @param fax the fax to set
	 */
	public void setFax(String fax) {
		this.fax = fax;
	}
	/**
	 * @return the phoneNumber
	 */
	public String getPhoneNumber() {
		return phoneNumber;
	}
	/**
	 * @param phoneNumber the phoneNumber to set
	 */
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	/**
	 * @return the companySize
	 */
	public CompanySize getCompanySize() {
		return companySize;
	}
	/**
	 * @param companySize the companySize to set
	 */
	public void setCompanySize(CompanySize companySize) {
		this.companySize = companySize;
	}
    
}
