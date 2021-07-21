<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|min:2|max:50|unique:products',
            'category_id' => 'required|integer',
            'description' => 'required|min:5|max:255',
            'price' => 'required|integer|min:0|max:999999',
            'image' => 'required|image',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Укажите наименование товара',
            'title.unique' => 'Товар уже существует',
            'category_id.required' => 'Выберите категорию',
            'description.required' => 'Дайте характеристики товару',
            'image.required' => 'Добавьте изображение товару',
            'price.required' => 'Укажите цену товара',
            'price.integer' => 'Введите число',
            'price.min' => 'Цена должна быть не менее 0',
            'price.max' => 'Цена должна быть не более миллиона',
        ];
    }
}
