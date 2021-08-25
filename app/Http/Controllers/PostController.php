<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Models\PostModel;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PostResource::collection(PostModel::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            ]);

        $post = new PostModel([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        $post->save();
        return response()->json([
            'data' => 'Post Created!',
        ]);
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return new PostResource(PostModel::findOrFail($id));
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            ]);

        $post = PostModel::findOrFail($id);
        $post->title = $request->title;
        $post->description = $request->description;

        $post->save();
        return response()->json([
            'data' => 'Post Updated!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = PostModel::findOrFail($id);
        $post->delete();
        return response()->json([
            'data' => 'Post Deleted!',
        ]);
    }
}
