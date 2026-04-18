# Proyecto dramos-dev: Estándares y Convenciones

Este documento describe las normas de estilo, arquitectura y desarrollo para el proyecto **dramos-dev**. Todas las contribuciones deben seguir estas directrices para mantener la consistencia del código.

## 🛠 Stack Tecnológico
- **Framework:** Angular 18+ (Componentes Standalone).
- **Lenguaje:** TypeScript 5.4+.
- **Estilos:** SCSS (Sass).
- **UI:** Angular Material, Flex Layout.
- **Gráficos:** Three.js para visualización 3D.
- **Móvil:** Capacitor para empaquetado nativo (Android).
- **Internacionalización:** ngx-translate.

## 📂 Estructura de Archivos
- **Nomenclatura:** Kebab-case para archivos y carpetas (ej. `button-back.component.ts`).
- **Organización:**
  - `src/app/@shared/`: Componentes, servicios, modelos y guards reutilizables.
  - `src/app/public/`: Vistas y componentes de la parte pública de la web.
  - `src/assets/`: Recursos estáticos (i18n, imágenes, modelos 3D en `.glb`/`.fbx`).

## 💻 Convenciones de Código (TypeScript)
- **Componentes:**
  - Deben ser **Standalone** (`standalone: true`).
  - Usar `templateUrl` y `styleUrls` para separar el HTML y CSS.
  - Utilizar `@UntilDestroy()` de `@ngneat/until-destroy` para gestionar suscripciones.
- **Servicios:**
  - Definidos con `@Injectable({ providedIn: 'root' })`.
- **Inyección de Dependencias:** Usar inyección por constructor.
- **Tipado:** Evitar `any` siempre que sea posible. Definir interfaces o modelos en `src/app/@shared/models`.
- **I18n:** Todas las cadenas de texto visibles deben pasar por el servicio `TranslateService`.

## 🎨 Estilos y UI
- **SCSS:** Preferir el uso de variables y mixins.
- **Layout:** Uso de Angular Flex-Layout para estructuras responsivas.
- **Iconos:** Uso de Angular Material Icons.

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
- Nunca subir archivos `.env` o secretos al repositorio.
- Seguir las políticas de seguridad de Capacitor al interactuar con APIs nativas.
