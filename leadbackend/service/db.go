package service

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func DBconnector() (*sql.DB, error) {
	var ConnStr string = "user=sirajudeen password=sirajudeen dbname=leads host=localhost port=5432 sslmode=disable"
	db, err := sql.Open("postgres", ConnStr)
	if err != nil {
		return nil, err
	}
	// defer db.Close()
	err = db.Ping()
	if err != nil {
		return nil, err
	}
	return db, err
}
