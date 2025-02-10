<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(RegisterRequest $request){
        $validation=$request->validated();
        $user=User::create($validation);

        // crèe une token á l‘aide de jwt
        $token=JWTAuth::fromUser($user);  


        return response()->json([
            'message'=>'l‘utilisateur crèe avec succèse',
            'user'=>$user,
            'token'=>$token
        ],201);
        
        
    }

    public function login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);
        $user=User::where('email',$request->email)->first();
        if(!$user){
            return response()->json([
                'errors'=>[
                    "email"=>'Invalid email'
                ]
            ],404);
        }
        elseif(!Hash::check($request->password,$user->password)){
            return response()->json([
                'errors'=>[
                    "password"=>"Incorrecte password" 
                ]
            ],401); // 401 == non autorisè
        }
        $token=JWTAuth::fromUser($user);

        return  response()->json([
            'message'=>'login et rèusse',
            'user'=>$user,
            'token'=>$token],200); // 200 === reposne rèussie
    }




    public function dashboard(Request $request){
        $user=$request->get('user');
        return response()->json([
            'message'=>'Suucefelly',
            'all lignes'=>'use ligne test pour tester est ce que tous les donner envoyer avec succes',
            'user'=>$user
        ],200);
    }

    public function Logout(){
        try{
            
            $token=JWTAuth::getToken();
            if(!$token){
                return  response()->json(['error'=>'token not provided'],404);
            }
            JWTAuth::invalidate($token);// logout en invlide le token pour ne pas faie
            return  response()->json(['message'=>'logout est réussie'],200);
        }
        catch(\tymon\JWTAuth\Exceptions\JWTException  $e){
            return response()->json(['error'=>'lougout ne pas rèussie'],404);

        }
       
    }
}
