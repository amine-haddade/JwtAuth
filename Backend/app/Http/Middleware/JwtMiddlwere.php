<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddlwere
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try{
            // parstoken permet de extraire le token á aprtire de l‘entéte de request souvent sur le Bearer Token
            // authenticate permet de dècode le tone est extraire le id est chrcher le user associè de ce id sur la base de donner 
            $user=JWTAuth::parseToken()->authenticate();        

            
        }
        catch(\tymon\JWTAuth\Exceptions\TokenInvalidException  $e){
            return response()->json(['error'=>'token invalid'],404);

        }
        catch(\tymon\JWTAuth\Exceptions\TokenExpiredException  $e){
            return response()->json(['error'=>'token expired'],404);

        }
        // je veux cic ajouter le user rècupèrer par le miidleware pour envoyer sur le controller 
        $request->attributes->add(['user'=>$user]);
        return $next($request);
    }
}
