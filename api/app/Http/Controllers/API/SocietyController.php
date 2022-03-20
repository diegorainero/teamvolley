<?php
namespace App\Http\Controllers\API;

use App\Models\Society;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;

class SocietyController extends BaseController
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$society =  Society::all();
		return $society;
		//return $this->sendResponse(SocietyResource::collection($society), 'Societies retrieved successfully.');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
		$society = Society::create($request->all());

		return $this->sendResponse(new SocietyResource($society), 'Product created successfully.');
		//return response()->json($society, 201);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$society = Society::find($id);
  
        if (is_null($society)) {
            return $this->sendError('Society not found.');
        }
   
        return $this->sendResponse(new SocietyResource($society), 'Society retrieved successfully.');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Society $society)
	{
		$society->update($request->all());
		return response()->json($society, 200);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}

	public function delete(Society $society)
	{
		$society->delete();
		return response()->json(null, 204);
	}
}
