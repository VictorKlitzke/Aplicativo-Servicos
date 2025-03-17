package routes

import (
	handlers "api/src/controllers"
	"api/src/database"
	"api/src/middleware"
	"net/http"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()
	db := database.DB

	mux.HandleFunc("/postLogin", func(w http.ResponseWriter, r *http.Request) {
		handlers.PostLogin(w, r, db)
	})
	mux.Handle("/getUsers", middleware.AuthMiddleware(db)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetUsers(w, r, db)
	})))
	mux.Handle("/getServices", middleware.AuthMiddleware(db)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetServices(w, r, db)
	})))
	handler := middleware.CORS(mux)

	return handler
}
