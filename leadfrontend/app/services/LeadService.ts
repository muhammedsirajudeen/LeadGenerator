import pool from "./Pool"

export interface CompanyInfo {
    domain: string;
    company_name: string;
    estimated_page_views: number;
    technologies: string;
    linkedin: string;
    title: string;
    estimated_visits: number;
    estimated_sales: number;
    estimated_annual_sales: string;
    phone: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    facebook: string;
    youtube: string;
    employee_count: number;
    product_count: number;
    country_code: string;
    city: string;
    location: string;
    company_description: string;
}
const PAGE_LIMIT=30
async function GetLeads(page: number,revenue:number) {
    try {
        // const limit=PAGE_LIMIT*page
        const offset=PAGE_LIMIT*(page-1)
        const query="SELECT * FROM company_data WHERE estimated_annual_sales > $3 ORDER BY company_name LIMIT $1 OFFSET $2 "
        const results = await pool.query(query,[PAGE_LIMIT,offset,revenue])
        
        return results.rows as CompanyInfo[] ?? []

    } catch (error) {
        console.log(error)
        return []
    }
}


export {
    GetLeads
}