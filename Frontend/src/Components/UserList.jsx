import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,deleteUser } from './Store/Actions/Action';
import {  useNavigate,Link } from 'react-router-dom';

const UserList = () => {
    const dispatch = useDispatch();    
    const users = useSelector((state) => state.userState.users);
    const token = useSelector((state) => state.userState.token);
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const UserDestroy=(id)=>{
            dispatch(deleteUser({id,token}))
    }
    const Userupdate=(id)=>{
        dispatch({type:"FindUser",payload:id})
        navigate('/update')
    }

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ul>
                {users && users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}<button  className='text-lg text-white  rounded-md border-none bg-red-600 py-1 px-3 ' onClick={()=>{UserDestroy(user.id)}} >remove </button><Link to={`/update/${user.id}`}  className='text-lg text-white  rounded-md border-none bg-green-600 py-1 px-3 ' onClick={()=>{Userupdate(user.id)}} >update</Link ></li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

