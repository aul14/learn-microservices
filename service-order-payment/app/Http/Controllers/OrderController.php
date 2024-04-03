<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private function getMidtransSnapUrl($params)
    {
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = (bool) env('MIDTRANS_PRODUCTION');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $snapUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        return $snapUrl;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $user = $request->user;
            $course = $request->course;

            $order = Order::create([
                'user_id' => $user['id'],
                'course_id' => $course['id'],
            ]);

            $transactionDetails = [
                'order_id' => $order->id . Str::random(5),
                'gross_amount' => $course['price']
            ];

            $itemDetails = [
                [
                    'id' => $course['id'],
                    'price' => $course['price'],
                    'quantity' => 1,
                    'name' => $course['name'],
                    'brand' => 'AulLearnDev',
                    'category' => 'Online Course'
                ]
            ];

            $customerDetails = [
                'first_name' => $user['name'],
                'email' => $user['email']
            ];

            $midtransParams = [
                'transaction_details' => $transactionDetails,
                'item_details' => $itemDetails,
                'customer_details' => $customerDetails
            ];

            $midtransSnapUrl = $this->getMidtransSnapUrl($midtransParams);

            $order->snap_url = $midtransSnapUrl;

            $order->metadata = [
                'course_id' => $course['id'],
                'course_price' => $course['price'],
                'course_name' => $course['name'],
                'course_thumbnail' => $course['thumbnail'],
                'course_level' => $course['level']
            ];
            $order->save();

            return response()->json([
                'status' => 'success',
                'data' => $order
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
