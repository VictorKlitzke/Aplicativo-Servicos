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
			// Extrai o token do cabeçalho Authorization
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "[AVISO] - TOKEN NÃO INFORMADO", http.StatusUnauthorized)
				return
			}

			// O token geralmente vem no formato "Bearer <token>"
			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
				http.Error(w, "[AVISO] - FORMATO DE TOKEN INVÁLIDO", http.StatusUnauthorized)
				return
			}

			tokenString := tokenParts[1]

			// Valida o token
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				return []byte(utils.JwtSecret), nil
			})
			if err != nil || !token.Valid {
				http.Error(w, "[AVISO] - AUTENTICAÇÃO NÃO VALIDADA", http.StatusForbidden)
				return
			}

			// Extrai o ID do usuário do token
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

			// Busca o usuário no banco de dados
			user, err := models.GetUserByID(db, int(userId))
			if err != nil {
				http.Error(w, "[AVISO] - USUÁRIO NÃO ENCONTRADO", http.StatusNotFound)
				return
			}

			// Adiciona o usuário ao contexto da requisição
			ctx := r.Context()
			ctx = context.WithValue(ctx, "user", user)
			r = r.WithContext(ctx)

			// Chama o próximo handler
			next.ServeHTTP(w, r)
		},
		)
	}
}
