package routes

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
	"github.com/muhammedsirajudeen/leadbackend/controller"
)

func SetupRoutes(app *fiber.App, db *sql.DB) {
	app.Get("/leads", func(ctx *fiber.Ctx) error {
		return controller.GetLeads(ctx, db)
	})
}
