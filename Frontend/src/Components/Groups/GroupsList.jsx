import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchGroups,deleteGroup } from "../Store/Actions/GroupActions";
import { Link,useNavigate } from "react-router-dom";

function GroupsList() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const ListGroups = useSelector((state) => state.groupState.listGroups);
  const token = useSelector((state) => state.userState.token);
  const isLoading = ListGroups.length === 0; // Vérifier si la liste est vide (chargement)

  useEffect(() => {
    dispatch(FetchGroups(token));
  }, [dispatch, token]);

  const updateGroup=(id)=>{
    dispatch({type:"FindGroup",payload:id})
    navigate(`/updateGroup/${id}`)
  }
  const deletGroup=(id)=>{
    dispatch(deleteGroup(token,id))

  }

  return (
    <div className="container flex flex-col  mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Liste des Groupes
      </h1>
      <Link to='/addGroup'  className='text-lg mb-3 text-white  rounded-md border-none bg-blue-700 py-1 px-3 '  >add group</Link>

      {isLoading ? (
        <p className="text-center text-gray-600">Chargement des groupes...</p>
      ) : ListGroups.length === 0 ? (
        <p className="text-center text-gray-600">Aucun groupe trouvé.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ListGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {group.nom}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>ID:</strong> {group.id}
              </p>
              <p className="text-gray-600">
                <strong>Nombre:</strong> {group.nombre}
              </p>
              <p className="text-gray-600">
                <strong>Filière:</strong> {group.filiere}
              </p>
              <button  onClick={()=>{updateGroup(group.id)}}  className='text-lg mb-3 text-white  rounded-md border-none bg-green-700 py-1 px-3 '  >update group</button>
              <button  onClick={()=>{deletGroup(group.id)}}  className='text-lg mb-3 text-white  rounded-md border-none bg-red-700 py-1 px-3 '  >delete group</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupsList;
