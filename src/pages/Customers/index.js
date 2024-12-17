import Header from '../../components/header';
import Title from '../../components/Title';
import { useState } from 'react';

import { FiUser } from 'react-icons/fi';

import { db } from '../../services/firebaseConnections';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function Customers() {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');


async function handleRegister(e){
    e.preventDefault();

    if (nome !== '' && cnpj !== '' && endereco !== '') {
        await addDoc(collection(db, "customers"), {
            nomeFantasia: nome,
            cnpj: cnpj,
            endereco: endereco
        })
            .then(() => {
                setNome('')
                setCnpj('')
                setEndereco('')
                toast.success("Empresa registrada!")
            })
            .catch((error) => {
                console.log(error);
                toast.error("Erro ao realizar o cadastro...")
            })
    } else {
        toast.error("Preencha todos os campos!")
    }}


    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className='container' onSubmit={handleRegister}>

                    <form className='form-profile'>


                    <label>Nome Fantasia</label>
                        <input type= "text" placeholder = "Nome da empresa" value={nome}
                        onChange={(e)=>setNome(e.target.value)}/>
                       
                       <label>Cnpj</label>
                        <input type= "number" placeholder = "Digite o cnpj" value={cnpj}
                        onChange={(e)=>setCnpj(e.target.value)}/>

                        <label>Endereço</label>
                        <input type= "text" placeholder = "Endereço" value={endereco}
                        onChange={(e)=>setEndereco(e.target.value)}/>


                    <button type='submit'>Salvar</button>

                    </form>
                </div>
            </div>
        </div>
    )
}