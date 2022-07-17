

import React, { useEffect, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, userData } from '../userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    //Me genero una variable que va a LEER de Redux
    const datosUsuario = useSelector(userData);
    const dispatch = useDispatch();

    //Hooks

    const [perfilUsuario, setPerfilUsuario] = useState({
        user_name: datosUsuario.user_name,
        user_surname: datosUsuario.user_surname,
        user_password: "*******",
        user_email: datosUsuario.user_email,
        user_address: datosUsuario.user_phone,
        user_city: datosUsuario.user_adress,
        user_mobile: datosUsuario.user_birth,

    });

    const navigate = useNavigate();

    //Handlers

    const handlerInputs = (e) => {
        console.log(e.target.value);

        setPerfilUsuario({ ...perfilUsuario, [e.target.name]: e.target.value })

    }

    useEffect(() => {
        // if(datosUsuario.token === ''){
        //     navigate("/");
        // }
    }, []);

    useEffect(() => {
        console.log(datosUsuario);
        if (datosUsuario.token === '') {
            navigate("/");
        }
    });

    //Funciones



    return (
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">Nombre</label><input type="text" class="form-control" placeholder="first name" value={perfilUsuario.user_name} onChange={handlerInputs}></input></div>
                            <div class="col-md-6"><label class="labels">Apellido</label><input type="text" class="form-control" value={perfilUsuario.user_surname} placeholder="surname" onChange={handlerInputs}></input></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">e-Mail</label><input type="text" class="form-control" placeholder="enter phone number" value={perfilUsuario.user_email} onChange={handlerInputs}></input></div>
                            <div class="col-md-12"><label class="labels">Teléfono</label><input type="text" class="form-control" placeholder="enter address line 1" value={perfilUsuario.user_mobile} onChange={handlerInputs}></input></div>
                            <div class="col-md-12"><label class="labels">Dirección</label><input type="text" class="form-control" placeholder="enter address line 2" value={perfilUsuario.user_address} onChange={handlerInputs}></input></div>
                            <div class="col-md-12"><label class="labels">Fecha Nacimiento</label><input type="text" class="form-control" placeholder="enter address line 2" value={perfilUsuario.user_birth} onChange={handlerInputs}></input></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label class="labels"></label><input type="text" class="form-control" placeholder="country" value=""></input></div>
                            <div class="col-md-6"><label class="labels"></label><input type="text" class="form-control" value="" placeholder="state"></input></div>
                        </div>
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center experience"><span></span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Alquileres</span></div><br></br>
                            <div class="col-md-12"><label class="labels">Experience in Designing</label><input type="text" class="form-control" placeholder="experience" value=""></input></div> <br></br>
                                <div class="col-md-12"><label class="labels">Additional Details</label><input type="text" class="form-control" placeholder="additional details" value=""></input></div>
                            </div>
                    </div>
                </div>
            </div>
    )
}
export default Profile;