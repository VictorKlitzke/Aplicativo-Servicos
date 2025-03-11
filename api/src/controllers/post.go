package handlers

import (
	"api/src/models"
	"api/src/utils"
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type LoginRequest struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Password string `json:"password" validate:"required,min=3"`
}

func PostLogin(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var creds LoginRequest

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}

	validate := validator.New()
	err = validate.Struct(creds)
	if err != nil {
		http.Error(w, "Dados inválidos: "+err.Error(), http.StatusBadRequest)
		return
	}

	user, err := models.GetUserByUsername(db, creds.Username)
	if err != nil {
		http.Error(w, "Usuário não encontrado", http.StatusUnauthorized)
		return
	}

	var password = user.Senha
	if !models.CheckPasswordHash(creds.Password, password) {
		http.Error(w, "Senha incorreta", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		http.Error(w, "Erro ao gerar token", http.StatusInternalServerError)
		return
	}
	response := map[string]string{
		"message": "Login bem-sucedido!",
		"token":   token,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
