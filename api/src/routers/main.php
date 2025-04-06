<?php

use App\Http\Routers;

Routers::post("/postLogin", "Post@postLogin");
Routers::post("/postRegisterUsers", "Post@postRegisterUsers");


// Rotas para os métodos GET
Routers::get("/getServices", "Get@getServices");
Routers::get("/getLogin", "Get@getLogin");
Routers::get("/getCEP/{cep}", "ApiExterna@getCEP");
