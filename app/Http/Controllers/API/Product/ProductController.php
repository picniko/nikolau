<?php

namespace App\Http\Controllers\API\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Http\Resources\Product\ProductsResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return ProductsResource::collection(Product::paginate(10));
    }

    public function store(ProductStoreRequest $request)
    {
        $file = $request->file('image');
        $filename = time() . $file->getClientOriginalName();
        $request->file('image')->storeAs('public/img', $filename);

        $product = Product::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'image' => $filename,
            'price' => $request['price'],
            'category_id' => $request['category_id'],
        ]);
        return new ProductsResource($product);
    }

    public function show(Product $product)
    {
        //
    }

    public function update(Request $request, Product $product)
    {
        //
    }

    public function destroy(Product $product)
    {
        //
    }
}
