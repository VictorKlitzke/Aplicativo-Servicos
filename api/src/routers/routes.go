package routes

import (
	handlers "api/src/controllers"
	"api/src/database"
	"api/src/middleware"
	"api/src/models"
	"net/http"
)

func SetupRoutes() {
	db := database.DB
	http.HandleFunc("/postLogin", func(w http.ResponseWriter, r *http.Request) {
		handlers.PostLogin(w, r, db)
	})

	protectedHandler := middleware.AuthMiddleware(db)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := r.Context().Value("user").(models.User)
		handlers.GetServices(w, r, db, user)
	}))
	http.Handle("/protegida", protectedHandler)
}
