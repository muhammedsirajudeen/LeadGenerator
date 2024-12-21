package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/muhammedsirajudeen/leadbackend/routes"
	"github.com/muhammedsirajudeen/leadbackend/service"
)

func main() {
	app := fiber.New()
	db, err := service.DBconnector()
	if err != nil {
		fmt.Println("Error Connecting to Postgres")
	}
	fmt.Println("Successfully connected to Postgres")
	routes.SetupRoutes(app, db)
	app.Listen(":3000")
}
