const URL = "https://carlosperez.site/administracion-base-de-datos/backend.php"; // Reemplaza con la ruta real de tu backend

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", mostrar);

// Insertar nueva persona
function insertar() {
  const data = {
    nombre: document.getElementById("nombre").value,
    apellido_paterno: document.getElementById("apellido_paterno").value,
    apellido_materno: document.getElementById("apellido_materno").value,
    edad: parseInt(document.getElementById("edad").value),
    fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
    correo: document.getElementById("correo").value
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    alert(res.mensaje || res.error);
    mostrar();
    document.getElementById("formulario").reset();
  });
}

// Mostrar registros
function mostrar() {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla tbody");
      tbody.innerHTML = "";
      data.forEach((item) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td><input value="${item.nombre}" onchange="actualizarCampo(${item.id}, 'nombre', this.value)"></td>
          <td><input value="${item.apellido_paterno}" onchange="actualizarCampo(${item.id}, 'apellido_paterno', this.value)"></td>
          <td><input value="${item.apellido_materno || ''}" onchange="actualizarCampo(${item.id}, 'apellido_materno', this.value)"></td>
          <td><input type="number" value="${item.edad}" onchange="actualizarCampo(${item.id}, 'edad', this.value)"></td>
          <td><input type="date" value="${item.fecha_nacimiento}" onchange="actualizarCampo(${item.id}, 'fecha_nacimiento', this.value)"></td>
          <td><input value="${item.correo}" onchange="actualizarCampo(${item.id}, 'correo', this.value)"></td>
          <td><button onclick="eliminar(${item.id})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
      });
    });
}

// Actualizar campo individual
function actualizarCampo(id, campo, valor) {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const persona = data.find(p => p.id === id);
      if (persona) {
        persona[campo] = valor;

        fetch(URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(persona)
        })
        .then(res => res.json())
        .then(res => {
          alert(res.mensaje || res.error);
          mostrar();
        });
      }
    });
}

// Eliminar persona
function eliminar(id) {
  if (!confirm("¿Seguro que deseas eliminar este registro?")) return;

  fetch(URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(res => {
    alert(res.mensaje || res.error);
    mostrar();
  });
}
