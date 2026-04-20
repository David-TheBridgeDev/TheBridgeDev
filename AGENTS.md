# Proyecto dramos-dev: Estándares y Convenciones

Este documento describe las normas de estilo, arquitectura y desarrollo para el proyecto **dramos-dev**. Todas las contribuciones deben seguir estas directrices para mantener la consistencia del código.

## 🛠 Stack Tecnológico
- **Framework:** Angular 18+ (Componentes Standalone).
- **Lenguaje:** TypeScript 5.4+.
- **Estilos:** SCSS (Sass).
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
  - `src/styles/`: Archivos SCSS globales y específicos (ej. `fonts.scss`, `music.scss`).

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
    - Micro-interacciones que imiten comportamientos retro (parpadeos de cursor, efectos de escaneo CRT sutiles, transiciones de "carga de datos").

## 🎨 Estilos y UI
- **SCSS:** Preferir el uso de variables y mixins. Mantener estilos específicos en `src/styles/` si afectan a múltiples componentes de un módulo.
- **Layout:** Uso de Angular Flex-Layout para estructuras responsivas, priorizando diseños cuadriculados que recuerden a las interfaces de usuario antiguas.
- **Iconos:** Combinar Material Icons con elementos de pixel-art o iconos de trazo grueso y simple.

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
