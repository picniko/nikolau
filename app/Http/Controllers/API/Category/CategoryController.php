<?php

namespace App\Http\Controllers\API\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        if (!!$request->all()) {
            $category = Category::with('products')->whereTitle($request->category)->first();
            return $category->products()->paginate(4);
        }
        return Category::select(['id', 'title'])->get();
    }

    // public function create()
    // {
    //     return view('category.create', [
    //         'categories' => CategoriesResource::collection(Category::all())->toJson(),
    //     ]);
    // }

    // public function store(Request $request)
    // {
    //     Category::create($request->all());
    //     return CategoriesResource::collection(Category::all());
    // }

    public function edit(Category $category)
    {
        //
    }

    public function update(Request $request, Category $category)
    {
        //
    }

    public function destroy(Category $category)
    {
        //
    }
}
