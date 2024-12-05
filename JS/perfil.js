function cargarDatosUsuario() {
  const usuario = localStorage.getItem('usuario');
  const correo = localStorage.getItem('correo');
  const contraseña = localStorage.getItem('contraseña');
   if (usuario) {
    document.querySelector('#usuario').value = usuario;
}
  if (correo) {
    document.querySelector('#correo').value = correo;
  }
  if (contraseña) {
    document.querySelector('#contraseña').value = contraseña;
  }
function guardarCambios() {
  const usuario = document.querySelector('#usuario').value;
  const correo = document.querySelector('#correo').value;
  const contraseña = document.querySelector('#contraseña').value;
  localStorage.setItem('usuario', usuario);
  localStorage.setItem('correo', correo);
  localStorage.setItem('contraseña', contraseña);
  alert('Su perfil ha sido modificado exitosamente');
  }
function eliminarPerfil() {
  const confirmacion = confirm('¿Está seguro de eliminar este perfil? Si aceptas ya no podrás acceder a esa información y deberás registrarte nuevamente.');
  if (confirmacion) {
      localStorage.removeItem('usuario');
      localStorage.removeItem('correo');
      localStorage.removeItem('contraseña');
      alert('Perfil eliminado exitosamente');
  }
  }
  document.addEventListener('DOMContentLoaded', (event) => {
    cargarDatosUsuario();
    document.querySelector('#guardarCambios').addEventListener('click', guardarCambios);
    document.querySelector('#eliminarPerfil').addEventListener('click', eliminarPerfil);
  });
}