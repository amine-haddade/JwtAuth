<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GroupeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups=Cache::remember("Groupe_Liste",3600,function(){
                return Group::select("id","nom","nombre","filiere")->get();  // Charger uniquement les colonnes nécessaires
                // ->witchCount('membres') /// il nècessaires pour afficher les nombre de les autre colonne associe  // pour optimser les requet et envoyer juste 10 par 10 
        });
        return response()->json([
            'message' => 'Liste des groupes récupérée avec succès',
            'groups' => $groups
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(GroupRequest $request)
    {
        $validationData=$request->validated();
        $Group=Group::create($validationData);
        Cache::forget("Groupe_Liste");
        return  response()->json([
            'message'=>'groupe ètè crèe avec succes',
            'group'=>$Group,
        ]);
    }
    
    /**
     * Display the specified resource.
     */
    
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate=$request->validate([
            "nom"=>"unique:groups,nom,".$id,
            "filiere"=>"min:5",
            "nombre"=>"numeric",
        ]);
        $group=Group::findOrFail($id);
        $group->update($validate);
        Cache::forget("Groupe_Liste");
        return  response()->json([
            'message'=>'groupe ètè modifier  avec succes',
            'group'=>$group,
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Group::where("id",$id)->delete();
        Cache::forget("Groupe_Liste");
        return  response()->json([
            "message"=>"group supprimer avec succès"
        ]);
    }
}
