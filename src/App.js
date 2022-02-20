import './App.css';
import React, {useState,useEffect} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

    // estados para almacenar la tabla de forma estatica, otro para almacenar los datos de la busqueda 
    //y el ultimo para controlar lo que se escribe en la barra de busqueda

    //datos de forma dinamica
    const [usuarios, setUsuarios] = useState([]);

    //datos de forma estatica
    const [tablaUsuarios, setTablaUsuarios] = useState([]);

    //Control de busqueda
    const [busqueda, setBusqueda] = useState("");

    // llamamos nuestra api por medio de una peticion asincrona
    const peticionGet=async()=>{
        await axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(response=>{
            setUsuarios(response.data);
            setTablaUsuarios(response.data);
            // muestra de datos de la api por consola
            console.log(response.data);
        }).catch(error=>{
            // error por consola
            console.log(error);
        })
    }

    // capturar lo que se escribe en el input de busqueda
    const handleChange=e=>{
        // almacenar la busqueda dentro del estado
        setBusqueda(e.target.value);
        // llamamos la funcion del filtro
        filtrar(e.target.value);
    }

    // filtrado el cual recibe como parametro el termino de Busqueda
    const filtrar=(terminoBusqueda)=>{
        // eslint-disable-next-line array-callback-return
        var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
            if(elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    }

    // llamamos nuestro metodo peticionGet
    useEffect(()=>{
        peticionGet();
    },[])
        
    return ( 
        <div className="App">
            {/* Barra buscadora */}
            <div className="containerInput">
                <input
                    className="form-control inputBuscar"
                    // el valor del input sera el estado busqueda
                    value={busqueda}
                    placeholder="Buscar"
                    onChange={handleChange}
                />
                {/* btn busqueda */}
                <button className="btn btn-success">Buscar</button>
            </div>

            {/* Renderizamos nuestra api */}
            <div className="table-responsive">
                {/* construimos una tabla con el fin de mostrar los datos de nuestra api */}
                <table className="table table-sm table-bordered">
                    <thead>
                        <tr>
                            {/* titulos de la tabla */}
                            <th>userId</th>
                            <th>Id</th>
                            <th>Title</th> 
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios &&
                        usuarios.map((usuario)=>(
                            //la clave de cada fila sera el id de cada dato
                            <tr key={usuario.id}>
                                {/* llamos los datos a la tabla */}
                                <td>{usuario.userId}</td>
                                <td>{usuario.id}</td>
                                <td>{usuario.title}</td>
                                <td>{usuario.completed ? '✔️':'❌'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default App;