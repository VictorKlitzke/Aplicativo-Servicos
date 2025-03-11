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
	handler := routes.SetupRoutes()

	ip := "192.168.1.4"
	port := "8080"
	addr := ip + ":" + port

	log.Println("Servidor rodando na porta 8080...")
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
