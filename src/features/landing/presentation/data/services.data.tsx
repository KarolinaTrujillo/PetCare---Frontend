export const services = [
  {
    title: 'Consulta médica general',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
    ),
    details: ['Revisión del estado de salud', 'Diagnóstico de enfermedades', 'Tratamientos y seguimiento médico'],
  },
  {
    title: 'Vacunación',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M19 3l2 2-7 7-2-2 7-7zM9 12L3 21h9l-3-9z"/><path d="M14 8l2 2"/>
      </svg>
    ),
    details: ['Aplicación de vacunas preventivas', 'Control del calendario de vacunación'],
  },
  {
    title: 'Desparasitación',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    details: ['Tratamiento contra parásitos internos', 'Contra pulgas, garrapatas y ácaros'],
  },
  {
    title: 'Nutrición y alimentación',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2a5 5 0 00-5 5c0 3 2 5 5 9 3-4 5-6 5-9a5 5 0 00-5-5z"/><path d="M12 12v10"/>
      </svg>
    ),
    details: ['Recomendación de dietas especiales para mascotas'],
  },
  {
    title: 'Peluquería',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/>
      </svg>
    ),
    details: ['Peluquería canina', 'Peluquería felina'],
  },
  {
    title: 'Radiología',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    details: ['Rayos X digitales', 'Diagnóstico por imagen', 'Resultados inmediatos'],
  },
  {
    title: 'Hospitalización',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>
      </svg>
    ),
    details: ['Cuidado intensivo 24/7', 'Monitoreo constante', 'Recuperación postoperatoria'],
  },
  {
    title: 'Odontología veterinaria',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2C9 2 6 4 6 7c0 2 1 3.5 1 5.5 0 3 1 7 2.5 9.5.5 1 1 1 1.5 0 .5-1 .5-3 1-3s.5 2 1 3c.5 1 1 1 1.5 0C16 19.5 17 15.5 17 12.5c0-2 1-3.5 1-5.5 0-3-3-5-6-5z"/>
      </svg>
    ),
    details: ['Limpieza dental profesional', 'Extracción y tratamientos', 'Prevención de enfermedades bucales'],
  },
]