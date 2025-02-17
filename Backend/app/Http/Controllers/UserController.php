<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{

    public function users(){
        $users=User::All();
        return  response()->json([
            "users"=>$users
        ],200);
    }
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
    public function update(request $request,$id){
        $user=User::find($id);
        if(!$user){
            return  response()->json([
                "message "=>"l‘utilisateurs non trouvè",
            ],404);
        }
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,'.$id,
            'password' => 'sometimes|min:4',
        ]);
        if(isset($validatedData['password'])){
            $validatedData['password']=Hash::make($validatedData['password']);
       }
       $user->update($validatedData);

        return response()->json([
            'message'=>'l‘utilisateur èter modifier avec succèse',
            'user'=>$user,
            
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

    public function Logout(Request $request){
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

    public function destroy($id){
        User::where('id',$id)->delete();
        return  response()->json([
            "message"=>"user supprimer avec succès"
        ]);
    }
}
