package main

import (
	database "api/src/database"
	routes "api/src/routers"
	"log"
	"net/http"
)

func main() {
	database.InitDB()
	defer database.DB.Close()

	routes.SetupRoutes()

	log.Println("Servidor rodando na porta 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}

}
