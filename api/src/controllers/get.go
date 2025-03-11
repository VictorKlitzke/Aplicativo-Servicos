package handlers

import (
	"api/src/models"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	user, ok := r.Context().Value("user").(models.User)
	if !ok {
		http.Error(w, "Usuário não autenticado", http.StatusUnauthorized)
		return
	}
	users, err := models.GetUsersAll(db)
	if err != nil {
		http.Error(w, "Erro ao buscar usuários", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Lista de usuários recuperada com sucesso!",
		"user":    user,
		"users":   users,
	})
}

func GetServices(w http.ResponseWriter, r *http.Request, db *sql.DB) {

}
