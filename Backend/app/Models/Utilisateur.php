<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Tymon\JWTAuth\Contracts\JWTSubject;

class Utilisateur extends Authenticatable implements JWTSubject
{
    protected $fillable=[
        'name',
        'email',
        'password'
    ];

    protected  $casts= [
       
            'password'=>'hashed'
        ];

    

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }
}