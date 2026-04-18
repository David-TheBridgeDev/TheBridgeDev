cd ./dramos.dev

@echo off
echo --------------------------------------------
echo Compilando Angular para prod...
echo --------------------------------------------
call ng build --configuration production

if errorlevel 1 (
    echo Error en la compilación de Angular.
    pause
    exit /b
)

echo --------------------------------------------
echo Copiando archivos web a Capacitor...
echo --------------------------------------------
call npx cap sync android

if errorlevel 1 (
    echo Error al copiar con Capacitor.
    pause
    exit /b
)

echo Build y copia completados con exito.
echo --------------------------------------------
call npx cap open android

echo Abriendo Android Studio...

echo Proceso completado.
pause