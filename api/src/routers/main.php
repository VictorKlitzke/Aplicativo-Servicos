<?php

use App\Http\Routers;

Routers::post("/postLogin", "Post@postLogin");
Routers::post("/postRegisterUsers", "Post@postRegisterUsers");
Routers::post("/postCategoryServices", "Post@postCategoryServices");
Routers::post("/postServices", "Post@postServices");

// Rotas para os métodos PUT
Routers::put("/updateProfile","Update@updateProfile");


// Rotas para Token
Routers::get("/validateToken", "token@validateToken");

// Rotas para os métodos GET
Routers::get("/getServices", "Get@getServices");
Routers::get("/getLogin", "Get@getLogin");
Routers::get("/getCategorys", "Get@getCategorys");


// Rotas para métodos GET Externos
Routers::get("/getCEP/{cep}", "ApiExterna@getCEP");
