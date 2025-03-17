package middleware

import (
	"api/src/models"
	"api/src/utils"
	"context"
	"database/sql"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(db *sql.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "[AVISO] - TOKEN NÃO INFORMADO", http.StatusUnauthorized)
				return
			}

			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
				http.Error(w, "[AVISO] - FORMATO DE TOKEN INVÁLIDO", http.StatusUnauthorized)
				return
			}

			tokenString := tokenParts[1]
			// print("Token extracted: ", tokenString)

			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				return []byte(utils.JwtSecret), nil
			})
			if err != nil || !token.Valid {
				http.Error(w, "[AVISO] - AUTENTICAÇÃO NÃO VALIDADA", http.StatusForbidden)
				return
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				http.Error(w, "[AVISO] - ERRO AO EXTRAIR INFORMAÇÕES DO TOKEN", http.StatusInternalServerError)
				return
			}

			userId, ok := claims["id"].(float64)
			if !ok {
				http.Error(w, "[AVISO] - TOKEN INVÁLIDO", http.StatusForbidden)
				return
			}

			user, err := models.GetUserByID(db, int(userId))
			if err != nil {
				http.Error(w, "[AVISO] - USUÁRIO NÃO ENCONTRADO", http.StatusNotFound)
				return
			}

			ctx := context.WithValue(r.Context(), "user", user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
