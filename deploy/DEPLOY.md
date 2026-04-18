# Proceso de Despliegue en Firebase Hosting

Este directorio contiene la configuración y los archivos necesarios para desplegar la aplicación Angular en Firebase Hosting.

## Estructura de Despliegue

- **`build/`**: Directorio donde Angular genera el build de producción (configurado en `angular.json`).
- **`public/`**: Directorio que Firebase utiliza como origen para el despliegue (configurado en `firebase.json`).
- **`firebase.json`**: Configuración de Firebase Hosting (reglas de redirección, headers, etc.).
- **`.firebaserc`**: Identificador del proyecto de Firebase (`personal-page-cv`).

## Despliegue Automático (GitHub Actions)

El despliegue se realiza de forma automática cada vez que se hace un **push** a la rama `main`. El flujo de trabajo definido en `.github/workflows/firebase-hosting-deploy.yml` realiza los siguientes pasos:

1.  Instala las dependencias del proyecto (`npm ci`).
2.  Genera el build de producción (`npm run build:pro`).
3.  Copia el contenido de `deploy/build/browser/` a `deploy/public/`.
4.  Despliega el contenido de `deploy/public/` a Firebase Hosting.

## Despliegue Manual (Local)

Si necesitas realizar un despliegue manual desde tu máquina local, sigue estos pasos:

1.  **Construir la aplicación:**
    ```bash
    npm run build:pro
    ```
2.  **Preparar la carpeta pública:**
    Asegúrate de copiar los archivos del build a la carpeta que Firebase espera:
    ```bash
    # En Windows (PowerShell)
    if (!(Test-Path deploy/public)) { New-Item -ItemType Directory -Path deploy/public }
    Copy-Item -Path "deploy/build/browser/*" -Destination "deploy/public/" -Recurse -Force
    ```
3.  **Desplegar:**
    Desde la raíz del proyecto, ejecuta:
    ```bash
    firebase deploy --only hosting --project personal-page-cv
    ```
    *Nota: Debes tener instalado `firebase-tools` y haber iniciado sesión con `firebase login`.*
