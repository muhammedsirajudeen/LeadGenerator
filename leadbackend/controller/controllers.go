package controller

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Company struct {
	Domain               string          `json:"domain"`
	CompanyName          string          `json:"company_name"`
	EstimatedPageViews   sql.NullInt64   `json:"estimated_page_views"`
	Technologies         sql.NullString  `json:"technologies"`
	LinkedIn             sql.NullString  `json:"linkedin"`
	Title                sql.NullString  `json:"title"`
	EstimatedVisits      sql.NullInt64   `json:"estimated_visits"`
	EstimatedSales       int             `json:"estimated_sales"`
	EstimatedAnnualSales sql.NullFloat64 `json:"estimated_annual_sales"`
	Phone                sql.NullString  `json:"phone"`
	Instagram            sql.NullString  `json:"instagram"`
	Twitter              sql.NullString  `json:"twitter"`
	TikTok               sql.NullString  `json:"tiktok"`
	Facebook             sql.NullString  `json:"facebook"`
	YouTube              sql.NullString  `json:"youtube"`
	EmployeeCount        sql.NullString  `json:"employee_count"`
	ProductCount         sql.NullInt64   `json:"product_count"`
	CountryCode          sql.NullString  `json:"country_code"`
	City                 sql.NullString  `json:"city"`
	Location             sql.NullString  `json:"location"`
	CompanyDescription   sql.NullString  `json:"company_description"`
}

// so this is how we interact with the database
func GetLeads(ctx *fiber.Ctx, db *sql.DB) error {
	rows, err := db.Query("SELECT * FROM COMPANY_DATA LIMIT 12000")
	if err != nil {
		log.Println(err)
		return ctx.JSON(fiber.Map{"message": "error occured"})
	}
	defer rows.Close()
	var companies []Company
	for rows.Next() {
		var company Company
		if err := rows.Scan(
			&company.Domain,
			&company.CompanyName,
			&company.EstimatedPageViews,
			&company.Technologies,
			&company.LinkedIn,
			&company.Title,
			&company.EstimatedVisits,
			&company.EstimatedSales,
			&company.EstimatedAnnualSales,
			&company.Phone,
			&company.Instagram,
			&company.Twitter,
			&company.TikTok,
			&company.Facebook,
			&company.YouTube,
			&company.EmployeeCount,
			&company.ProductCount,
			&company.CountryCode,
			&company.City,
			&company.Location,
			&company.CompanyDescription,
		); err != nil {
			log.Println(err)
			return ctx.SendStatus(fiber.ErrInternalServerError.Code)
		}
		//now handle null values for each after doing that just ship it with the frontend after including auth
		companies = append(companies, company)
	}

	return ctx.JSON(fiber.Map{"message": "Hello World", "company": companies})
}
