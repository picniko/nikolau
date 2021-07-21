<?php

namespace App\Http\Controllers\API\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user_orders = $user->orders;
        $orders = array_column($user_orders->toArray(), 'id');
        $orders = Order::whereIn('id', $orders)->with('products')->get();

        return $orders;
    }

    public function finish()
    {
        $user = Auth::user();
        $order = $user->orders->where('status', 0)->first();

        $orderProducts = $order->products;

        $sum = $orderProducts->map(function ($orderProduct) use ($order) {
            $order->products()->updateExistingPivot($orderProduct->id, [
                'price' => $orderProduct->price,
            ]);
            return $orderProduct->pivot->quantity * $orderProduct->price;
        })->sum();

        $data = [
            'orderProducts' => $orderProducts,
            'sum' => $sum,
        ];
        try {
            Mail::send('mail.orderFinish', $data, function ($message) use ($user) {
                $message->subject('Новый заказ');
                $message->to($user->email);
            });
        } catch (Exception $e) {

        }

        $order->status = 1;
        $order->save();
    }

    public function newProduct(Request $request)
    {
        $userId = Auth::user()->id;
        $order = Order::where('user_id', $userId)->whereStatus(0)->first();

        if (!$order) {
            $order = Order::create([
                'user_id' => $userId,
            ]);
        }

        $product = Product::find($request['new']);

        $orderProduct = OrderProduct::where('order_id', $order->id)
            ->where('product_id', $product->id)
            ->first();

        if ($orderProduct) {
            $orderProduct->quantity += $request['quantityChange'];
            if ($orderProduct->quantity == 0) {
                $orderProduct->delete();
            } else {
                $orderProduct->save();
            }
        } else {
            $orderProduct = OrderProduct::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => 1,
                'price' => $product->price,
            ]);
        }
        return $orderProduct;
    }

    public function addProduct(Request $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status', 0)->first();
        if (!$order) {
            $order = Order::create([
                'user_id' => $user->id,
            ]);
        }

        $product = Product::find($request['productId']);

        if ($order->products->contains($product)) {
            $orderProduct = $order->products()->where('product_id', $product->id)->first();
            $quantity = ++$orderProduct->pivot->quantity;
            $order->products()->updateExistingPivot($product->id, [
                'quantity' => $quantity,
            ]);
        } else {
            $order->products()->attach($product, [
                'quantity' => 1,
                'price' => $product->price,
            ]);
            $orderProduct = $order->products()->where('product_id', $product->id)->first();
        }
        return $orderProduct;
    }

    public function removeProduct(Request $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status', 0)->first();
        if (!$order) {
            $order = Order::create([
                'user_id' => $user->id,
            ]);
        }

        $product = Product::find($request['productId']);

        $orderProduct = $order->products()->where('product_id', $product->id)->first();
        if ($orderProduct->pivot->quantity == 1) {
            $order->products()->detach($product);
            $orderProduct->pivot->quantity = 0;
            return $orderProduct;
        } else {
            $quantity = --$orderProduct->pivot->quantity;
            $order->products()->updateExistingPivot($product->id, [
                'quantity' => $quantity,
            ]);
        }
        return $orderProduct;
    }

    public function cartProducts(Order $order)
    {
        $user = Auth::user();
        $order = $user->orders->where('status', 0)->first();
        $orderProducts = $order ? $order->products()->get() : [];

        return $orderProducts;
    }

    public function show(Order $order)
    {
        //
    }

    public function update(Request $request, Order $order)
    {
        //
    }

    public function destroy(Order $order)
    {
        //
    }
}
