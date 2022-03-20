<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('players', function (Blueprint $table) {
			$table->increments('id');
			$table->string('nome');
			$table->integer('society_id');
			$table->string('teams');
			$table->date('data_nascita');
			$table->string('tel');
			$table->string('mail');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('players');
	}
}
