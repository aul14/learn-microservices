<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MentorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('mentors', [MentorController::class, 'index']);
Route::post('mentors', [MentorController::class, 'create']);
Route::get('mentors/{id}', [MentorController::class, 'show']);
Route::put('mentors/{id}', [MentorController::class, 'update']);
