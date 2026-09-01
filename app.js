document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const form = document.getElementById('form-reporte');
  const txtDescripcion = document.getElementById('descripcion-reporte');
  const inpFoto = document.getElementById('foto-reporte');
  const btnGuardar = document.getElementById('btn-guardar');
  const modal = document.getElementById('modal-confirmacion');
  const folioSpan = document.getElementById('folio-dinamico');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');

  /**
   * Valida los requisitos para habilitar el botón de envío:
   * - Descripción >= 10 caracteres.
   * - Imagen seleccionada.
   */
  const validarFormulario = () => {
    const esDescripcionValida = txtDescripcion.value.trim().length >= 10;
    const esFotoValida = inpFoto.files && inpFoto.files.length > 0;

    btnGuardar.disabled = !(esDescripcionValida && esFotoValida);
  };

  /**
   * Genera un folio simulado con formato REP-YYYYMMDD-XXXX
   */
  const generarFolio = () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REP-${fecha}-${randomStr}`;
  };

  // Listeners para validación en tiempo real
  txtDescripcion.addEventListener('input', validarFormulario);
  inpFoto.addEventListener('change', validarFormulario);

  // Gestión del envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Inhibe recarga de página

    // Simulación de guardado y despliegue de modal
    const folio = generarFolio();
    folioSpan.textContent = folio;
    
    modal.hidden = false;
  });

  // Cerrar modal
  btnCerrarModal.addEventListener('click', () => {
    modal.hidden = true;
    form.reset(); // Limpiar formulario
    validarFormulario(); // Resetear estado del botón
  });
});