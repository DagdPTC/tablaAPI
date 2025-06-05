const API_URL = "https://retoolapi.dev/T340sU/integrantes"

//Función que llama a la API y realiza una solicitud GET
async function ObtenerRegistros(){
    //Hacemos GET a la API y obtenemos su repuesta (response)
    const respuesta = await fetch(API_URL);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); //Esto ya es un JSON

    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);
}

//Funcion para generar las filas de la tabla
//"datos" representa al JSON

function MostrarRegistros(datos){

    //Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para imyectar código en html usamos innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });

}

ObtenerRegistros();

//Proceso para agregar registros 
const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrarModal")

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abre el botón cuando a btnAgregar se le hace el click
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Abre el botón cuando a btnAgregar se le hace el click
});

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que los datos de envíen por defecto

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validación básica
    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return; //Evita que el código se siga ejecutando
    }

    //Llamar a la API para enviar los datos
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre,apellido,correo})
    });

    if(respuesta.ok){
        //Mensaje de confirmación
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recarga la tabla
        ObtenerRegistros();
    }
    else{
        alert("Error, no se pudo guardar");
    }

})




