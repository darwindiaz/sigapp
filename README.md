# SIGAPP

SIGAPP es un MVP construido con Ionic 8, Angular 18 y Firebase/Firestore para apoyar la gestión básica de una finca ganadera en Colombia y contextos tropicales.

El objetivo inicial es cubrir lo mínimo funcional para inventario animal, potreros, salud/vacunación, nacimientos y movimientos internos, manteniendo una arquitectura que permita reemplazar Firebase por otro backend más adelante.

## Versión actual

**SIGAPP 1.0.0 — Primera versión MVP.**

## Estado actual del MVP

- Autenticación con Firebase.
- Separación inicial de servicios base en `core/services`.
- Contratos de dominio base en `core/models`.
- Repositorios base en `core/repositories`.
- Mensajes centralizados con códigos de aplicación.
- Layout autenticado con tabs inferiores.
- Botón central flotante para registro rápido.
- Menú rápido inicial para acciones ganaderas frecuentes.

## Stack técnico

- Ionic 8
- Angular 18
- Node 20
- Firebase 10
- Firestore
- Capacitor 6

## Identidad visual

La paleta, tipografia, uso de logo, direccion de ilustraciones y criterios
visuales del MVP se documentan en el [manual de marca](docs/brand/README.md).

## Estructura principal

```text
src/app/
├── core/
├── features/
└── shared/
```

## Decisiones de arquitectura

### Core

Contiene piezas transversales de la aplicación:

- servicios base;
- guards;
- constantes globales;
- enums compartidos;
- modelos de dominio;
- contratos de resultado;
- repositorios.

Esto reduce acoplamiento entre pantallas y evita que la lógica crítica quede distribuida en componentes.

### Features

Contiene módulos funcionales o pantallas del producto:

- autenticación;
- inicio;
- inventario;
- layout principal;
- futuros módulos ganaderos.

Cada feature debe crecer de forma independiente para mantener el proyecto escalable.

### Repositories

La comunicación con Firestore debe quedar detrás de repositorios.

La intención es que los componentes no dependan directamente de Firebase. Si en el futuro se cambia a un backend REST, GraphQL, NestJS, Supabase u otro proveedor, el impacto debe concentrarse en la capa de datos.

## Navegación actual

```text
/auth
/main
├── /main/home
├── /main/paddocks
├── /main/inventory
├── /main/health
└── /main/reports
```

El layout principal usa `ion-tabs`. No se debe agregar manualmente otro `ion-router-outlet` dentro de `main.page.html`, porque `ion-tabs` ya gestiona internamente su outlet.

## Acciones rápidas actuales

El botón central abre un menú con acciones base:

- Registrar animal
- Registrar nacimiento
- Registrar vacunación
- Movimiento de potrero

Por ahora estas acciones preparan el flujo funcional. Las rutas y formularios específicos se construirán en fases posteriores.

## Comandos útiles

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm start
```

Compilar:

```bash
npm run build
```

Ejecutar pruebas:

```bash
npm test
```

## Roadmap funcional

### Fase 0 — Base técnica

- Limpieza de rutas.
- Corrección de navegación.
- Centralización de mensajes.
- Contrato `AppResult<T>`.
- Separación inicial de responsabilidades.

Estado: completada.

### Fase 1 — Core y servicios

- Separar responsabilidades del antiguo servicio utilitario.
- Consolidar servicios base.
- Crear modelos y repositorios iniciales de dominio.

Estado: completada.

### Fase 2 — Layout principal

- Crear layout autenticado con tabs.
- Agregar botón central flotante.
- Crear menú rápido de registro.
- Preparar navegación hacia formularios.

Estado: en progreso.

### Fase 3 — Inventario animal

- Registro básico de animales.
- Consulta de inventario.
- Edición básica.
- Estado del animal.
- Relación con finca y potrero.

### Fase 4 — Potreros

- Registro de potreros.
- Capacidad estimada.
- Estado del potrero.
- Movimientos de animales.

### Fase 5 — Salud y vacunación

- Registro de eventos sanitarios.
- Vacunación.
- Desparasitación.
- Alertas próximas.

### Fase 6 — Nacimientos

- Registro de nacimiento.
- Relación madre-cría.
- Fecha, sexo, peso inicial y observaciones.

## Buenas prácticas acordadas

- Mantener componentes livianos.
- Evitar lógica de negocio dentro de páginas.
- Centralizar mensajes del sistema.
- Evitar `throw error` para flujos esperados de usuario.
- Usar `AppResult<T>` para respuestas controladas.
- Evitar rutas duplicadas.
- Validar con `ng build` después de cada fase.
- Mantener commits pequeños y verificables.

## Pendientes próximos

- Crear páginas placeholder para formularios de registro rápido.
- Conectar cada acción rápida con navegación real.
- Revisar si las acciones rápidas deben quedarse en `core` o moverse a `features/main`.
- Definir estructura final de módulos ganaderos.
- Revisar diseño visual y paleta de colores en una fase posterior.
- Perfil de usuario (MU).
- Reportes esenciales (AxAV).
- Configuracion y preferencias del usuario.
