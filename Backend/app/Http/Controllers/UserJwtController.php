<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserJwtRequest;
use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserJwtController extends Controller
{
    public function index(){
        $allUtilisateurs=Utilisateur::All();
        return  response()->json([
            "Utilisateurs"=>$allUtilisateurs
        ],200);
    }
    public function register(UserJwtRequest $request){
        $dataUserValidate=$request->validated();
        $user=Utilisateur::create($dataUserValidate);

        $token=JWTAuth::fromUser($user);
        return  response()->json([
            'message'=>'l‘enregistremnt de user arèussi',
            'user'=>$user,
            'token'=>$token
        ]);

    }
    public function Login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);
        $user=Utilisateur::where('email',$request->email)->first();
        if(!$user){
            return  response()->json([
                'error'=>[
                    "email"=>"invalide email"
                ]
                ],404);
        }elseif(!Hash::check($request->password,$user->password)){
            return response()->json([
                "error"=>[
                    "password"=>"mots pass incorect"
                ]
                ],404);
        }
        $token=JWTAuth::fromUser($user);

        return  response()->json([
            "message"=>"logi has seccesufly",
            "user"=>$user,
            "token"=>$token
        ]);


    }
    public function logout(Request $request){
        try{
            $token=JWTAuth::getToken();
            JWTAuth::invalidate($token);
            return  response()->json(["message"=>"log out est rèusie"],200);
        }catch(\Tymon\JWTAuth\Exceptions\JWTException $e){
            return response()->json(['error'=>'lougout ne pas rèussie'],404);

        }
    }
}
