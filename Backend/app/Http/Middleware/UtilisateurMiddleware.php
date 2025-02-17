<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Claims\JwtId;
use Tymon\JWTAuth\Facades\JWTAuth;

class UtilisateurMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try{
            $token=JWTAuth::getToken();
            if(!$token){
                return  response()->json(['error'=>'token not Provided']);

            }
            $user=JWTAuth::parseToken()->authenticate();

        }catch(\tymon\JWTAuth\Exceptions\TokenInvalidException  $e){
            return  response()->json(['error'=>'token invalid'],404);

        }
        catch(\tymon\JWTAuth\Exceptions\TokenExpiredException  $e){
            return  response()->json(['error'=>'token expired']);

        };
        $request->attributes->add(["user="=>$user]);
        return $next($request);
    }
}
