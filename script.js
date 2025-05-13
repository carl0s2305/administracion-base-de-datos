let registros = [];

function insertar() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const edad = document.getElementById("edad").value;

  if (!nombre || !correo || !edad) {
    alert("Completa todos los campos.");
    return;
  }

  registros.push({ nombre, correo, edad });
  mostrar();
  document.getElementById("formulario").reset();
}

function mostrar() {
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = "";

  registros.forEach((reg, index) => {
    const row = `<tr>
      <td><input value="${reg.nombre}" onchange="actualizar(${index}, 'nombre', this.value)"></td>
      <td><input value="${reg.correo}" onchange="actualizar(${index}, 'correo', this.value)"></td>
      <td><input value="${reg.edad}" onchange="actualizar(${index}, 'edad', this.value)"></td>
      <td><button onclick="eliminar(${index})">Eliminar</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function actualizar(index, campo, valor) {
  registros[index][campo] = valor;
}

function eliminar(index) {
  if (confirm("¿Deseas eliminar este registro?")) {
    registros.splice(index, 1);
    mostrar();
  }
}
