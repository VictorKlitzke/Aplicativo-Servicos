package models

import "database/sql"

type Services struct {
	ID             int     `json:"codigo"`
	Servico        string  `json:"servico"`
	Preco          float64 `json:"preco"`
	Profissional   string  `json:"profissional"`
	ProfissionalId int     `json:"profissional_id"`
}

func GetServicesAll(db *sql.DB) ([]Services, error) {
	query := `SELECT 
                s.id codigo, 
                s.nome servico, 
                s.preco,
                u.nome profissional,
                profissional_id 
            FROM 
                servicos s
                JOIN usuarios u ON u.id = s.profissional_id`

	rows, err := db.Query(query)
	println("services", rows)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var services []Services
	for rows.Next() {
		var service Services
		err := rows.Scan(&service.ID, &service.Servico, &service.Preco, &service.Profissional, &service.ProfissionalId)
		if err != nil {
			return nil, err
		}
		services = append(services, service)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return services, nil
}
