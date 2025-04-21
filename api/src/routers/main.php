<?php

use App\Http\Routers;

Routers::post("/postLogin", "Post@postLogin");
Routers::post("/postRegisterUsers", "Post@postRegisterUsers");
Routers::post("/postCategoryServices", "Post@postCategoryServices");
Routers::post("/postServices", "Post@postServices");


Routers::get("/validateToken", "token@validateToken");

// Rotas para os métodos GET
Routers::get("/getServices", "Get@getServices");
Routers::get("/getLogin", "Get@getLogin");
Routers::get("/getCategorys", "Get@getCategorys");


Routers::get("/getCEP/{cep}", "ApiExterna@getCEP");
