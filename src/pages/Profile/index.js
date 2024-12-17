// import { useContext, useState } from 'react';
// import Header from '../../components/header';
// import Title from '../../components/Title';

// import { FiUser, FiUpload } from 'react-icons/fi';
// import avatar from '../../assets/fotousuariobase.png';
// import { doc, updateDoc } from 'firebase/firestore';
// import { db, storage } from '../../services/firebaseConnections';
// import { toast } from 'react-toastify';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// import { AuthContext } from '../../contests/auth';
// import './profile.css';

// export default function Profile() {

//     const { user, storageUser, setUser, logout } = useContext(AuthContext);

//     const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
//     const [imageAvatar, setImageAvatar] = useState(null);
//     const [nome, setNome] = useState(user && user.nome);
//     const [email, setEmail] = useState(user && user.email);

//     function handleFile(e) {
//         if (e.target.files[0]) {
//             const image = e.target.files[0];

//             if (image.type === 'image/jpeg' || image.type === 'image/png') {
//                 setImageAvatar(image)
//                 setAvatarUrl(URL.createObjectURL(image))
//             } else {
//                 alert("Envie uma imagem do tipo PNG ou JPEG")
//                 setImageAvatar(null);
//                 return;
//             }
//         }
//     }

//     async function handleUpload() {
//     const currentUid = user.uid;

//     const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

//     const uploadTask = uploadBytes(uploadRef, imageAvatar)
//     .then((snapshot)=>{
//         getDownloadURL(snapshot.ref).then(async(downloadURL)=>{
//             let urlFoto = downloadURL;

//             const docRef = doc(db,"users", user.uid)
//             await updateDoc(docRef,{
//                 avatarUrl: urlFoto,
//                 nome:nome,
//             })
//             .then(()=>{
//                 let data = {
//                     ...user,
//                     nome: nome,
//                     avatarUrl: urlFoto,
//                 }
//                 setUser(data);
//                 storageUser(data);
//                 toast.success("Pelamordedeus acho que deu certo")
//             })
//         })
//     })
//     }


// async function handleSubmit(e) {
//     e.preventDefault();
//     if (imageAvatar === null && nome !== '') {
//         const docRef = doc(db, "users", user.uid)
//         await updateDoc(docRef, {
//             nome: nome,
//         })
//             .then(() => {
//                 let data = {
//                     ...user,
//                     nome: nome,
//                 }
//                 setUser(data);
//                 storageUser(data);
//                 toast.success("Atualizado com sucesso!")
//             })
//     } else if (nome !== '' && imageAvatar !== null) {
//         handleUpload()
//     }
// }


// return (
//     <div>
//         <Header />
//         <div className="content">
//             <Title name="Minha conta">
//                 <FiUser size={25} />
//             </Title>

//             <div className="container">

//                 <form className="form-profile" onSubmit={handleSubmit}>

//                     <label className="label-avatar">
//                         <span>
//                             <FiUpload color="#DB9D00" size={35} />
//                         </span>

//                         <input type='file' accept="image/*" onChange={handleFile} style={{ display: 'none' }} /><br />

//                         {avatarUrl === null ? (
//                             <img src={avatar} alt="Foto de perfil" width={250} height={250} />
//                         ) : (
//                             <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
//                         )}


//                     </label>
//                     <label>
//                         <label>Nome</label>
//                         <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
//                         <label>Email</label>
//                         <input type="email" value={email} disabled={true} />
//                         <button type='submit'>Salvar</button>
//                     </label>

//                 </form>

//             </div>

//             <div className='container'>
//                 <button className='logout-btn' onClick={() => logout()}>Logout</button>
//             </div>

//         </div>

//     </div>
// )
// }


import { useContext, useState, useEffect } from 'react';
import Header from '../../components/header';
import Title from '../../components/Title';
import { FiUser, FiUpload } from 'react-icons/fi';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnections';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contests/auth';
import './profile.css';

export default function Profile() {
    const { user, setUser, storageUser, logout } = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '/images/perfil/fotousuariobase.png');
    const [nome, setNome] = useState(user?.nome || '');
    const [email, setEmail] = useState(user?.email || '');
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [imageOptions, setImageOptions] = useState([]);

    // Carregar imagens do JSON ao montar o componente
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch('/images/perfil/images.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar imagens');
                }
                const data = await response.json();
                
                // Garante que a imagem base (id: 1) esteja sempre disponível
                const baseImage = data.find(image => image.id === 1);
                if (baseImage) {
                    setAvatarUrl(baseImage.url);
                }

                setImageOptions(data);
            } catch (error) {
                console.error('Erro ao carregar imagens:', error);
                toast.error('Erro ao carregar opções de imagem.');
            }
        }
        fetchImages();
    }, []);

    // Alternar a exibição das opções de imagem
    const handleImageClick = () => {
        setShowImageOptions(!showImageOptions);
    };

    // Selecionar uma imagem e atualizar o perfil
    const handleImageSelection = async (url) => {
        try {
            setAvatarUrl(url);
            setShowImageOptions(false);

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { avatarUrl: url });

            const updatedUser = { ...user, avatarUrl: url };
            setUser(updatedUser);
            storageUser(updatedUser);
            toast.success("Imagem de perfil atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o avatar:", error);
            toast.error("Erro ao atualizar a imagem de perfil.");
        }
    };

    // Atualizar o nome do usuário
    async function handleSubmit(e) {
        e.preventDefault();
        if (nome !== '') {
            try {
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, { nome: nome });
                const updatedUser = { ...user, nome: nome };
                setUser(updatedUser);
                storageUser(updatedUser);
                toast.success("Nome atualizado com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar o nome:", error);
                toast.error("Erro ao atualizar o nome.");
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Minha conta">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar" onClick={handleImageClick}>
                            <span>
                                <FiUpload color="#DB9D00" size={35} />
                            </span>
                            <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                        </label>

                        {showImageOptions && (
                            <div className="image-options">
                                {/* Exibe todas as opções de imagens incluindo a base */}
                                {imageOptions.map((img) => (
                                    <img
                                        key={img.id}
                                        src={img.url}
                                        alt={`Opção de perfil ${img.id}`}
                                        width={100}
                                        height={100}
                                        onClick={() => handleImageSelection(img.url)}
                                        style={{ cursor: 'pointer', margin: '5px', border: avatarUrl === img.url ? '2px solid blue' : 'none' }}
                                    />
                                ))}
                            </div>
                        )}

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label>Email</label>
                        <input type="email" value={email} disabled />
                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn" onClick={() => logout()}>Logout</button>
                </div>
            </div>
        </div>
    );
}






