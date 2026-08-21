# Manual de marca SIGAPP

Este documento define una direccion visual sencilla para SIGAPP. Es una referencia
para el MVP y una base para futuras mejoras; no obliga a implementar todos los
elementos de inmediato.

## 1. Identidad

**Nombre oficial:** SIGAPP
**Categoria:** gestion ganadera
**Contexto:** Colombia y regiones tropicales

La marca debe sentirse:

- confiable y clara;
- cercana al trabajo rural;
- moderna, sin parecer una aplicacion bancaria;
- practica y orientada a operaciones repetidas;
- legible tanto en web como en dispositivos moviles.

La interfaz debe priorizar informacion y acciones. Las ilustraciones apoyan el
contexto, pero no deben competir con formularios, listados o indicadores.

## 2. Logo

El sistema de marca debe contemplar estas variantes:

| Variante | Uso |
| --- | --- |
| Simbolo | App icon, favicon, avatar y espacios reducidos |
| Logo horizontal | Autenticacion, documentos y presentaciones |
| Monocromatico blanco | Fondos verdes u oscuros |
| Monocromatico verde | Fondos blancos o muy claros |

### Reglas

- Usar el nombre `SIGAPP` siempre con la misma escritura.
- Mantener la proporcion original del logo.
- No rotar, comprimir, estirar ni agregar sombras fuertes.
- No poner el logo sobre una imagen con demasiado detalle.
- Preferir el simbolo sin texto cuando el espacio sea menor de `120px`.
- Mantener un area libre alrededor equivalente, como minimo, al 20% de la altura
  del simbolo.

### Archivos maestros

| Archivo | Tamano maestro | Formato |
| --- | ---: | --- |
| `sigapp-mark.png` | 2048 x 2048 | PNG transparente |
| `sigapp-logo-horizontal.png` | 2400 x 800 | PNG transparente |
| `sigapp-logo-white.png` | 2048 x 2048 | PNG transparente |
| `app-icon.png` | 1024 x 1024 | PNG con fondo solido |
| `favicon.png` | 512 x 512 | PNG |

El simbolo debe seguir siendo reconocible a `24 x 24px`. Si se genera con una
herramienta de IA, se debe pedir sin texto y luego construir el nombre con una
tipografia real para evitar letras deformadas.

### Recursos provisionales del MVP

- `src/assets/logo/logo.webp`: símbolo utilizado dentro de la aplicación.
- `src/assets/icon/favicon.png`: favicon maestro de `512 x 512`.
- `src/assets/icon/icon-192.png` y `icon-512.png`: iconos del manifiesto web.
- `resources/icon.png`: fuente maestra del icono nativo de `1024 x 1024`.
- `resources/splash.png`: fuente maestra de la pantalla de inicio.

Estas rutas deben conservarse cuando se reemplace el logo provisional para
evitar cambios innecesarios en la configuración web y nativa.

## 3. Paleta de colores

La paleta combina naturaleza, confianza y lectura operativa. El verde identifica
la marca, pero no debe dominar todas las superficies.

| Token | Color | Uso principal |
| --- | --- | --- |
| Verde principal | `#176B43` | Acciones primarias, header y seleccion |
| Verde oscuro | `#0C4A2F` | Estados activos, contraste y marca |
| Verde claro | `#DCEFE5` | Fondos de seleccion y confirmacion |
| Azul cielo | `#2B6F8A` | Informacion, enlaces y graficos |
| Amarillo cosecha | `#E0A72F` | Acentos y advertencias no criticas |
| Fondo general | `#F4F7F5` | Fondo de pantallas |
| Superficie | `#FFFFFF` | Formularios, listas y tarjetas |
| Texto principal | `#17231D` | Titulos y contenido principal |
| Texto secundario | `#5F6F66` | Ayudas, fechas y metadatos |
| Borde | `#D7E0DB` | Divisores y controles |
| Error | `#B93832` | Errores y acciones destructivas |
| Advertencia | `#9A6700` | Alertas preventivas |

### Combinaciones recomendadas

- Texto blanco sobre verde principal o verde oscuro.
- Texto principal sobre fondo general, superficie o verde claro.
- Texto principal sobre amarillo cosecha.
- No usar texto blanco sobre amarillo cosecha.
- No usar verde claro como color de texto.
- Las ilustraciones pueden incorporar azul cielo y amarillo cosecha para evitar
  una interfaz compuesta unicamente por tonos verdes.

### Borrador de tokens Ionic

Estos tokens sirven como referencia para una implementacion futura:

```scss
:root {
  --sigapp-primary: #176b43;
  --sigapp-primary-dark: #0c4a2f;
  --sigapp-primary-soft: #dcefe5;
  --sigapp-secondary: #2b6f8a;
  --sigapp-accent: #e0a72f;

  --sigapp-background: #f4f7f5;
  --sigapp-surface: #ffffff;
  --sigapp-text: #17231d;
  --sigapp-text-muted: #5f6f66;
  --sigapp-border: #d7e0db;

  --sigapp-danger: #b93832;
  --sigapp-warning: #9a6700;
}
```

## 4. Tipografia

### Familias propuestas

- **Titulos y marca:** Manrope.
- **Interfaz y contenido:** Inter.
- **Fallback:** `Arial, sans-serif`.

Si el MVP no incorpora fuentes externas, se puede usar temporalmente la fuente
del sistema. La jerarquia y los tamanos deben mantenerse.

### Escala

| Estilo | Tamano | Interlineado | Peso |
| --- | ---: | ---: | ---: |
| Titulo principal | 24px | 32px | 700 |
| Titulo de seccion | 20px | 28px | 700 |
| Titulo de tarjeta | 18px | 24px | 600 |
| Cuerpo | 16px | 24px | 400 |
| Cuerpo pequeno | 14px | 20px | 400 |
| Etiqueta de control | 14px | 20px | 600 |
| Boton | 15px | 20px | 600 |
| Caption | 12px | 16px | 400 |
| Tab inferior | 11px | 16px | 500 |

Reglas:

- No ajustar el tamano de fuente con unidades ligadas al ancho de pantalla.
- Evitar textos en mayusculas sostenidas, excepto siglas como `SIGAPP`.
- No usar espaciado negativo entre letras.
- Mantener como minimo `16px` para texto principal y campos de formulario.
- Usar peso y color antes de agregar nuevos tamanos tipograficos.

## 5. Espaciado y geometria

Escala recomendada:

```text
4, 8, 12, 16, 24, 32, 40 y 48px
```

| Elemento | Regla |
| --- | --- |
| Contenido movil | 16px de margen lateral |
| Contenido web | 24px de margen lateral y ancho maximo controlado |
| Separacion entre campos | 12-16px |
| Separacion entre secciones | 24-32px |
| Tarjetas | Radio maximo de 8px |
| Inputs y botones | Radio entre 4 y 8px |
| Botones circulares | Solo iconos, FAB o avatares |
| Objetivos tactiles | Minimo 44 x 44px |

Las sombras deben ser suaves y escasas. Los bordes y el espacio son preferibles
a encerrar cada seccion en una tarjeta.

## 6. Direccion de imagenes

### Estilo

- Ilustracion editorial semirrealista.
- Ganaderia tropical colombiana reconocible.
- Luz natural y colores equilibrados.
- Animales bien proporcionados y tratados con respeto.
- Paisajes con pasturas, cercas, agua y vegetacion tropical.
- Composiciones limpias con un punto focal claro.
- Sin texto, logotipos ni marcas de agua dentro de la imagen.
- Sin apariencia de fotografia generica de banco de imagenes.
- Sin fondos recargados detras de contenido operativo.

### Uso por superficie

| Superficie | Tratamiento |
| --- | --- |
| Autenticacion | Fondo ilustrativo con area limpia para el formulario |
| Home | Ilustraciones horizontales diferentes por modulo |
| Estado vacio | Ilustracion pequena con fondo transparente |
| Formularios | Fondo neutro, sin imagen detras de campos |
| Listados | Fondo neutro; imagen solo en estado vacio |
| Reportes | Graficos y datos nativos, no dibujados dentro de imagenes |

### Medidas

| Recurso | Medida | Formato objetivo |
| --- | ---: | --- |
| Fondo autenticacion web | 1920 x 1080 | WebP |
| Fondo autenticacion movil | 1080 x 1920 | WebP |
| Imagen de tarjeta Home | 1600 x 600 | WebP |
| Estado vacio | 1200 x 900 | PNG transparente |
| Banner de modulo opcional | 1600 x 400 | WebP |

Objetivos de peso:

- Tarjeta Home: menos de `150KB`.
- Fondo: menos de `350KB`.
- Estado vacio: menos de `250KB`.
- Logo usado en la app: menos de `200KB`.

## 7. Iconos

- Usar Ionicons como familia principal.
- Preferir estilo `outline` en navegacion y acciones secundarias.
- Usar una variante rellena solo para indicar seleccion.
- Mantener tamanos de `20px`, `24px` o `28px`.
- Todo boton que muestre solo un icono debe tener nombre accesible.
- No sustituir iconos conocidos con ilustraciones decorativas.

## 8. Idioma y tono

- Idioma visible: espanol de Colombia (`es-CO`).
- Usar frases cortas y directas.
- Preferir `Guardar animal` sobre `Proceder con el registro`.
- Evitar terminos tecnicos de Firebase o del codigo en mensajes al usuario.
- Mantener en ingles los valores internos ya persistidos en Firestore.
- Traducir esos valores mediante mapas de etiquetas antes de mostrarlos.

Ejemplos:

```text
female -> Hembra
male -> Macho
active -> Activo
available -> Disponible
dual-purpose -> Doble proposito
```

## 9. Alcance MVP y futuro

### Aplicar durante la Fase 8

- Nombre `SIGAPP` consistente.
- Documento HTML en `es-CO`.
- Textos visibles en espanol.
- Correccion de typos.
- Paleta base en tokens globales.
- Logo nuevo en autenticacion y favicon.
- Imagenes diferentes para las tarjetas de Home.
- Formularios y listados con espaciado consistente.
- Pruebas responsive y de contraste.

### Puede quedar para despues del MVP

- Vectorizacion profesional del logo.
- Variantes impresas y para redes sociales.
- Sistema completo de ilustraciones.
- Animaciones de marca.
- Plantillas para documentos y reportes.
- Tema oscuro.
- Sitio publico o material comercial.

## 10. Lista de validacion

Antes de aprobar una pantalla:

- [ ] Todos los textos visibles estan en espanol.
- [ ] Se identifica claramente la finca activa.
- [ ] Existe una sola accion primaria visible por contexto.
- [ ] El texto tiene contraste suficiente.
- [ ] No hay imagenes detras de formularios o datos densos.
- [ ] Los elementos tactiles miden al menos 44 x 44px.
- [ ] Los iconos sin texto tienen nombre accesible.
- [ ] No hay recortes, solapamientos o desplazamiento horizontal.
- [ ] La pantalla funciona en movil y escritorio.
- [ ] Los assets mantienen la direccion visual descrita en este manual.
