const experiencias = [
    {
        id: 1,
        nombre: 'Desayuno especial',
        descripcion: 'Un desayuno sorpresa para compartir en un día especial.',
        precio: 45000,
        imagen: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800',
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Día del Padre'],
        personas: ['Mi mamá', 'Mi papá', 'Un familiar']
    },
    {
        id: 2,
        nombre: 'Tarde de café',
        descripcion: 'Una tarde agradable para conversar y disfrutar.',
        precio: 30000,
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi papá', 'Mi mamá', 'Un amigo', 'Un familiar']
    },
    {
        id: 3,
        nombre: 'Taller de arte',
        descripcion: 'Una experiencia creativa para pintar y aprender.',
        precio: 70000,
        imagen: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
        ocasiones: ['Cumpleaños', 'Aniversario', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 4,
        nombre: 'Día de relajación',
        descripcion: 'Un espacio para descansar y disfrutar del bienestar.',
        precio: 90000,
        imagen: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Día del Padre'],
        personas: ['Mi mamá', 'Mi papá', 'Mi pareja']
    },
    {
        id: 5,
        nombre: 'Cena especial para dos',
        descripcion: 'Una cena para compartir momentos inolvidables.',
        precio: 150000,
        imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        ocasiones: ['Aniversario', 'San Valentín', 'Cumpleaños'],
        personas: ['Mi pareja']
    },
    {
        id: 6,
        nombre: 'Experiencia de aventura',
        descripcion: 'Un plan diferente para disfrutar y vivir emociones.',
        precio: 250000,
        imagen: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 7,
        nombre: 'Picnic sorpresa',
        descripcion: 'Un picnic al aire libre para compartir y disfrutar.',
        precio: 60000,
        imagen: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
        ocasiones: ['Cumpleaños', 'Aniversario', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Mi mamá', 'Un familiar']
    },
    {
        id: 8,
        nombre: 'Spa para dos',
        descripcion: 'Una experiencia de relajación para disfrutar en compañía.',
        precio: 180000,
        imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
        ocasiones: ['Aniversario', 'San Valentín', 'Cumpleaños'],
        personas: ['Mi pareja', 'Mi mamá', 'Un amigo']
    },
    {
        id: 9,
        nombre: 'Clase de baile',
        descripcion: 'Aprende nuevos pasos y disfruta de la música.',
        precio: 80000,
        imagen: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800',
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 10,
        nombre: 'Caja de dulces personalizada',
        descripcion: 'Una selección de dulces para sorprender a alguien especial.',
        precio: 40000,
        imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
        ocasiones: ['Cumpleaños', 'San Valentín', 'Día de la Madre', 'Día del Padre'],
        personas: ['Mi pareja', 'Mi mamá', 'Mi papá', 'Un amigo', 'Un familiar']
    },
    {
        id: 11,
        nombre: 'Escapada de fin de semana',
        descripcion: 'Un viaje para desconectarse y descubrir nuevos lugares.',
        precio: 350000,
        imagen: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
        ocasiones: ['Aniversario', 'San Valentín', 'Cumpleaños'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 12,
        nombre: 'Taller de cocina',
        descripcion: 'Una actividad para aprender recetas y compartir sabores.',
        precio: 120000,
        imagen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Día del Padre', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Mi mamá', 'Mi papá', 'Un amigo', 'Un familiar']
    },
    {
        id: 13,
        nombre: 'Sesión de fotografía',
        descripcion: 'Conserva recuerdos especiales con una sesión fotográfica.',
        precio: 220000,
        imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
        ocasiones: ['Cumpleaños', 'Aniversario', 'San Valentín'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    },
    {
        id: 14,
        nombre: 'Experiencia de spa premium',
        descripcion: 'Un día completo de bienestar, descanso y cuidado personal.',
        precio: 280000,
        imagen: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800',
        ocasiones: ['Cumpleaños', 'Día de la Madre', 'Aniversario'],
        personas: ['Mi mamá', 'Mi pareja', 'Un familiar']
    },
    {
        id: 15,
        nombre: 'Día de deportes extremos',
        descripcion: 'Una aventura llena de adrenalina y nuevas emociones.',
        precio: 320000,
        imagen: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        ocasiones: ['Cumpleaños', 'Quiero sorprender'],
        personas: ['Mi pareja', 'Un amigo', 'Un familiar']
    }
];

export default experiencias;