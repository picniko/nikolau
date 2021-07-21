<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Category::create([
            'title' => 'Процессоры',
            'description' => 'Тест',
        ]);
        \App\Models\Category::create([
            'title' => 'Видеокарты',
            'description' => 'Тест',
        ]);
        \App\Models\Category::create([
            'title' => 'Материнские платы',
            'description' => 'Тест',
        ]);
        \App\Models\Category::create([
            'title' => 'Оперативная память',
            'description' => 'Тест',
        ]);
        \App\Models\Category::create([
            'title' => 'Блоки питания',
            'description' => 'Тест',
        ]);
        \App\Models\Category::create([
            'title' => 'Корпуса',
            'description' => 'Тест',
        ]);
        \App\Models\Category::create([
            'title' => 'Накопители',
            'description' => 'Тест',
        ]);

        \App\Models\User::factory(3)->create();

        \App\Models\Product::factory(5)->create();
    }
}
