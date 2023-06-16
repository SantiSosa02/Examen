const url = 'http://localhost:8083/api/colegio';

const listarDatos = async() =>{
    let respuesta="";
    let contenido = document.getElementById("contenido");

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"content-type": "application/json; charset=utf-8"}
    })
    .then((resp) => resp.json())
    .then(function(data){
        let listaColegios = data.colegios
        return listaColegios.map(function(colegio){
            respuesta += `<tr><td>${colegio.direccion}</td>
            <td>${colegio.latitud}</td>
            <td>${colegio.longitud}</td>
            <td>${colegio.descripcion}</td>
            <td>${colegio.fechaReporte}</td>
            <td>
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(colegio)})'>Editar</a> 
                <a class="waves-effect waves-light btn modal-danger red" href="#" onclick='eliminar(${JSON.stringify(colegio)})'>Eliminar</a>
            </td>
            </tr>`
            contenido.innerHTML=respuesta
        })
    })
}

const registrar = async () => {

    let _direccion = document.getElementById('direccionRegistro').value
    let _latitud = document.getElementById('latitudRegistro').value
    let _longitud = document.getElementById('longitudRegistro').value
    let _descripcion = document.getElementById('descripcionRegistro').value
    let _fechaReporte = document.getElementById('fechaReporte').value

    if (_direccion === '' || _latitud === '' || _longitud === '' || _descripcion === '') {
        // Mostrar mensaje de campos vacíos
        Swal.fire(
          'Por favor, complete todos los campos',
          '',
          'error'
        );
        return; // Detener la ejecución de la función
      }


        let _colegio = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
            fechaReporte:fechaReporte
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_colegio),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            console.log(json.msg)
            //alert(json.msg)//Mensaje que retorna la API
            Swal.fire(
                json.msg,
                '',
                'success'
              ).then(()=>{
              window.location.href="/listarDatos.html"
            })
        })
        
    }

    const editar = (colegio) => {

        document.getElementById('direccion').value =''
        document.getElementById('latitud').value =''
        document.getElementById('longitud').value =''
        document.getElementById('descripcion').value =''
        document.getElementById('id').value =''
        
        
        document.getElementById('id').value = colegio._id
        document.getElementById('direccion').value = colegio.direccion
        document.getElementById('latitud').value = colegio.latitud
        document.getElementById('longitud').value = colegio.longitud
        document.getElementById('descripcion').value = colegio.descripcion
}
        
        const actualizar = async () => {
        let id = document.getElementById('id').value;
        let direccion = document.getElementById('direccion').value
        let latitud = document.getElementById('latitud').value
        let longitud = document.getElementById('longitud').value
        let descripcion = document.getElementById('descripcion').value
        
        let colegio = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion
        }
        fetch(url + `?id=${id}`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(colegio),//Convertir el objeto usuario a JSON
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
        Swal.fire(
        json.msg,
        '',
        'success'
        ).then(() => {
        location.reload();
        })
        })
        
        }
      
      
  const eliminar = (id) => {
    Swal.fire({
      title: '¿Está seguro de realizar la eliminación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let colegio = {
          _id: id,
        };
        fetch(url, {
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(colegio),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((resp) => resp.json())
          .then(json => {
            Swal.fire(
              json.msg,
              '',
              'success'
            ).then(() => {
              location.reload();
            });
          });
      }
    });
  };
  

    if(document.querySelector('#btnRegistrar')){
        document.querySelector('#btnRegistrar').addEventListener('click', registrar)
    }
    if(document.querySelector('#btnActualizar')){
        document.querySelector('#btnActualizar').addEventListener('click', actualizar)
    }