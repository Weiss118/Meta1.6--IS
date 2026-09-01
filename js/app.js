document.addEventListener('DOMContentLoaded', () => {
  // Diccionario de gravedades por categoría
  const GRAVEDADES_MAP = {
    "Bache": ["Poco profundo", "Moderado", "Muy profundo"],
    "Alcantarilla dañada": ["Sin tapa", "Hundida", "Obstruida / Rebasada"],
    "Luminaria dañada": ["Apagada", "Parpadeando", "Físicamente rota"],
    "Desperfecto en la acera": ["Grietas / Desnivel", "Levantada por raíces", "Destruida"],
    "Otro": ["Prioridad Baja", "Prioridad Media", "Prioridad Alta"]
  };

  // Referencias DOM
  const form = document.getElementById('form-reporte');
  const selCategoria = document.getElementById('categoria-reporte');
  const contGravedad = document.getElementById('contenedor-gravedad');
  const selGravedad = document.getElementById('gravedad-reporte');
  const txtDescripcion = document.getElementById('descripcion-reporte');
  const inpFoto = document.getElementById('foto-reporte');
  const btnGuardar = document.getElementById('btn-guardar');
  const modal = document.getElementById('modal-confirmacion');
  const folioSpan = document.getElementById('folio-dinamico');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');

  /**
   * Actualiza dinámicamente las opciones de gravedad
   */
  const actualizarGravedad = () => {
    const categoria = selCategoria.value;
    const opciones = GRAVEDADES_MAP[categoria];

    // Limpiar opciones anteriores de forma segura
    while (selGravedad.options.length > 0) {
      selGravedad.remove(0);
    }

    if (opciones) {
      // Agregar opción default
      const defaultOpt = document.createElement('option');
      defaultOpt.value = "";
      defaultOpt.textContent = "Seleccione gravedad...";
      defaultOpt.disabled = true;
      defaultOpt.selected = true;
      selGravedad.appendChild(defaultOpt);

      // Agregar opciones mapeadas
      opciones.forEach(texto => {
        const opt = document.createElement('option');
        opt.value = texto;
        opt.textContent = texto;
        selGravedad.appendChild(opt);
      });

      contGravedad.hidden = false;
      selGravedad.disabled = false;
    } else {
      contGravedad.hidden = true;
      selGravedad.disabled = true;
    }
    validarFormulario();
  };

  /**
   * Valida los 4 requisitos obligatorios
   */
  const validarFormulario = () => {
    const esCategoriaValida = selCategoria.value !== "";
    const esGravedadValida = selGravedad.value !== "";
    const esDescripcionValida = txtDescripcion.value.trim().length >= 10;
    const esFotoValida = inpFoto.files && inpFoto.files.length > 0;

    btnGuardar.disabled = !(esCategoriaValida && esGravedadValida && esDescripcionValida && esFotoValida);
  };

  const generarFolio = () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REP-${fecha}-${randomStr}`;
  };

  // Listeners de eventos
  selCategoria.addEventListener('change', actualizarGravedad);
  selGravedad.addEventListener('change', validarFormulario);
  txtDescripcion.addEventListener('input', validarFormulario);
  inpFoto.addEventListener('change', validarFormulario);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    folioSpan.textContent = generarFolio();
    modal.hidden = false;
  });

  const cerrarModal = () => {
    modal.hidden = true;
    form.reset();
    // Resetear estado dinámico
    contGravedad.hidden = true;
    selGravedad.disabled = true;
    validarFormulario();
  };

  btnCerrarModal.addEventListener('click', cerrarModal);

  // Accesibilidad: Cerrar con tecla ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      cerrarModal();
    }
  });
});