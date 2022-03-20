<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\SocietyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
        
Route::middleware('auth:sanctum')->group( function () {
    Route::resource('society', SocietyController::class);
});

//Route::middleware('auth:sanctum')->get('society', 'App\Http\Controllers\API\SocietyController@index');
//Route::middleware('auth:sanctum')->get('society/{society}', 'App\Http\Controllers\API\SocietyController@show');
// Route::middleware('auth:sanctum')->post('societies', 'App\Http\Controllers\SocietiesController@store');
// Route::middleware('auth:sanctum')->put('societies/{society}', 'App\Http\Controllers\SocietiesController@update');
// Route::middleware('auth:sanctum')->delete('societies/{society}', 'App\Http\Controllers\SocietiesController@delete');

// Teams block Route

// Route::middleware('auth:sanctum')->get('teams', 'App\Http\Controllers\TeamsController@index');
// Route::middleware('auth:sanctum')->get('teams/{team}', 'App\Http\Controllers\SocietiesController@show');
// Route::middleware('auth:sanctum')->post('teams', 'App\Http\Controllers\TeamsController@store');
// Route::middleware('auth:sanctum')->put('teams/{team}', 'App\Http\Controllers\TeamsController@update');
// Route::middleware('auth:sanctum')->delete('teams/{team}', 'App\Http\Controllers\TeamsController@delete');

// PLayers block Route

// Route::middleware('auth:sanctum')->get('players', 'App\Http\Controllers\PlayersController@index');
// Route::middleware('auth:sanctum')->get('players/{player}', 'App\Http\Controllers\PLayersController@show');
// Route::middleware('auth:sanctum')->post('players', 'App\Http\Controllers\PlayersController@store');
// Route::middleware('auth:sanctum')->put('players/{player}', 'App\Http\Controllers\PlayersController@update');
// Route::middleware('auth:sanctum')->delete('players/{player}', 'App\Http\Controllers\PlayersController@delete');
