<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $rules = [
            'user_id' => 'required|integer',
            'course_id' => 'required|integer',
            'rating' => 'required|integer|min:1|max:5',
            'note' => 'string'
        ];

        $data = $request->all();

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $courseId = $request->course_id;
        $course = Course::find($courseId);

        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found!'
            ], 404);
        }

        $userId = $request->user_id;
        $user = getUser($userId);

        if ($user['status'] === 'error') {
            return response()->json([
                'status' => $user['status'],
                'message' => $user['message']
            ], $user['http_code']);
        }

        $isExistReview = Review::where('course_id', $courseId)
            ->where('user_id', $userId)
            ->exists();

        if ($isExistReview) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review already exist'
            ], 409);
        }

        $review = Review::create($data);
        return response()->json([
            'status' => 'success',
            'data' => $review
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rules = [
            'rating' => 'integer|min:1|max:5',
            'note' => 'string'
        ];

        $data = $request->except('user_id', 'course_id');

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review is not found!'
            ], 404);
        }

        $review->fill($data);
        $review->save();

        return response()->json([
            'status' => 'success',
            'data' => $review
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review is not found!'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'review deleted'
        ]);
    }
}
