package models

import (
	"database/sql"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID    int
	Nome  string `json:"username"`
	Senha string `json:"password"`
	Tipo  string `json:"tipo"`
	Email string `json:"email"`
}

func GetUserByUsername(db *sql.DB, username string) (User, error) {

	var user User

	query := `SELECT id, nome, senha, email, tipo FROM usuarios WHERE nome =?`
	err := db.QueryRow(query, username).Scan(&user.ID, &user.Nome, &user.Senha, &user.Tipo, &user.Email)
	if err != nil {
		return user, err
	}

	return user, nil
}

func GetUsersAll(db *sql.DB) ([]User, error) {
	rows, err := db.Query("SELECT nome, tipo, email FROM usuarios")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.Nome, &user.Tipo, &user.Email)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func GetUserByID(db *sql.DB, id int) (User, error) {
	var user User

	query := `SELECT id FROM usuarios WHERE id = ?`
	err := db.QueryRow(query, id).Scan(&user.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			return user, errors.New("usuário não encontrado")
		}
		return user, err
	}

	print(user.ID)

	return user, nil
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
