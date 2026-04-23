# Proyecto dramos-dev: Estándares y Convenciones

Este documento describe las normas de estilo, arquitectura y desarrollo para el proyecto **dramos-dev**. Todas las contribuciones deben seguir estas directrices para mantener la consistencia del código.

## 🛠 Stack Tecnológico
- **Framework:** Angular 18+ (Componentes Standalone).
- **Lenguaje:** TypeScript 5.4+.
- **Estilos:** SCSS (Sass Modules con `@use`) + CSS Variables dinámicas.
- **UI:** Angular Material, Flex Layout.
- **Gráficos:** Three.js para visualización 3D.
- **Móvil:** Capacitor para empaquetado nativo.
- **Internacionalización:** ngx-translate.

## 📂 Estructura de Archivos
- **Nomenclatura:** Kebab-case para archivos y carpetas (ej. `button-back.component.ts`).
- **Organización:**
  - `src/app/@shared/`: Componentes, servicios, modelos y guards reutilizables para toda la aplicación.
  - `src/app/public/`: Vistas y componentes de la web pública (Landing, CV, etc.).
  - `src/app/projects/`: Módulos de aplicaciones específicas integradas (Music, Home Automation/Shelly).
  - `src/assets/`: Recursos estáticos (i18n, imágenes, modelos 3D en `.glb`/`.fbx`).
  - `src/styles/`: Arquitectura SCSS modular basada en partials (`_variables.scss`, `_base.scss`, `_animations.scss`, etc.).

## 💻 Convenciones de Código (TypeScript)
- **Componentes:**
  - Deben ser **Standalone** (`standalone: true`).
  - Usar `templateUrl` y `styleUrls` para separar el HTML y CSS en componentes complejos.
  - Componentes muy simples (ej. `AppComponent` con solo un router-outlet) pueden usar `template` y `styles` inline.
  - Utilizar obligatoriamente `@UntilDestroy()` de `@ngneat/until-destroy` para gestionar la limpieza de suscripciones en componentes que usen observables.
- **Servicios:**
  - Definidos con `@Injectable({ providedIn: 'root' })`.
- **Inyección de Dependencias:** Preferiblemente inyección por constructor para mantener consistencia con el código base.
- **Tipado:** Evitar `any` siempre que sea posible. Definir interfaces o modelos en `src/app/@shared/models`.
- **I18n:** Todas las cadenas de texto visibles deben pasar por el servicio `TranslateService`.

## 🌓 Gestión de Temas (Dark Mode)
La aplicación soporta temas claro y oscuro gestionados mediante `ThemeService`.
- **Persistencia:** El tema se guarda en `localStorage` y se sincroniza con la preferencia del sistema.
- **Implementación:** Basada en CSS Variables definidas en `_variables.scss`.
- **Regla de Oro:** **NUNCA** usar colores hardcodeados (ej. `#fff`, `black`, `white`) en los archivos `.scss`. Usar siempre variables CSS como `var(--bg-color)`, `var(--black)`, `var(--surface-color)`, etc.
- **Transiciones:** Las transiciones de tema deben ser rápidas (`0.1s ease`) para una respuesta instantánea.

## 🪟 Gestión de Ventanas y Estados Globales
Existe un `WindowStateService` que centraliza el estado de la interfaz "Retro OS".
- **Minimización:** El estado `isMinimized` colapsa secciones de forma sincronizada en toda la web pública.
- **Secuencias Críticas (BSOD):** El estado `isCrashing` activa una secuencia de glitch y pantalla azul de error realista. Al realizar cambios en el `AppComponent`, se debe respetar el overlay del BSOD.

## 🎨 Identidad Visual (Retro-Playful)
La aplicación debe transmitir una estética **"Retro-Tech Alegre"**, fusionando la nostalgia de los inicios de la informática con un tono vibrante y moderno. Se busca un equilibrio entre la "sabiduría" de los sistemas clásicos y la "alegría" de una interfaz viva.
- **Concepto:** Referencias a terminales clásicos, interfaces de los 80/90 y el minimalismo lúdico.
- **Tipografía:**
    - **Datos y Código:** Monospace (ej. `IBM Plex Mono`, `Courier New`) para evocar consolas y terminales.
    - **Narrativa y Títulos:** Serif clásica (o Slab Serif) para aportar aire de "sabiduría y experiencia" (nostalgia).
- **Colores:** 
    - Contrastes que recuerden al fósforo verde o ámbar sobre fondos oscuros.
    - Uso de colores "vintage" pero saturados (azules eléctricos, naranjas quemados, beige tipo "hardware antiguo").
- **Componentes:**
    - Bordes sólidos y marcados (2px+) con sombras sin desenfoque (estilo *Neobrutalismo*) para un toque juguetón.
    - Esquinas con redondeo sutil (4px) para mantener un aspecto mecánico/analógico.
    - Micro-interacciones que imiten comportamientos retro (parpadeos de cursor, efectos de escaneo CRT sutiles, transiciones de "carga de datos", BSOD en cierre de ventana).

## 🎨 Estilos y UI
- **Sass (SCSS):**
    - Se utiliza el sistema de módulos de Sass con `@use`. El uso de `@import` está deprecado y debe evitarse.
    - **Partials:** Todos los estilos globales se dividen en archivos que empiezan con guion bajo (ej. `_variables.scss`).
    - **Encapsulación:** Los estilos específicos de un componente (ej. Header, Footer) **deben** residir en su archivo `.scss` local y no en el global.
    - **Variables SASS:** Mapas de variables SASS que apuntan a variables CSS para mantener compatibilidad y reactividad.
- **Layout:** Uso de Angular Flex-Layout para estructuras responsivas, priorizando diseños cuadriculados que recuerden a las interfaces de usuario antiguas.
- **Iconos:** 
    - Los iconos SVG deben usar `stroke: currentColor` para adaptarse automáticamente al tema activo.
    - Evitar atributos `stroke` o `fill` fijos en el HTML de los SVGs.

## 📏 Formateo (EditorConfig)
- **Indentación:** 2 espacios.
- **Comillas:** Simples (`'`) en TypeScript.
- **Newline:** Asegurar siempre una línea nueva al final del archivo.
- **Espacios:** Eliminar espacios en blanco al final de las líneas.

## 🚀 Comandos Útiles
- `npm run start:local`: Inicia el entorno de desarrollo local con proxy.
- `npm run build:pro`: Genera el build de producción.
- `npm run test`: Ejecuta las pruebas unitarias.

## ⚠️ Consideraciones de Seguridad
- Nunca subir archivos `.env`, secretos o configuraciones sensibles al repositorio.
- Seguir las políticas de seguridad de Capacitor al interactuar con APIs nativas.

## 📄 Actualización de Perfil y Experiencia
Cada vez que el usuario solicite añadir o actualizar información sobre su trayectoria laboral o conocimientos técnicos, **es obligatorio leer el archivo `doc/C.V David Ramos.pdf`** para cargar su contenido en el contexto y asegurar que la información sea fiel a dicho documento.
