Consigna:
1:

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

    Agregar en la vista info, el número de procesadores presentes en el servidor.
    Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
    Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
    Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
    Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
    Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

2:

    Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
    Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
    El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
    Verificar que todo funcione correctamente.
    Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Aspectos a incluir en el entregable:

    Incluir el archivo de configuración de nginx junto con el proyecto.
    Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

consigna 1:

/\* por defecto se escucha en el puerto 8080 para pasar puerto por flag : -p 8081

Correr servidor modo cluster:

nodemon server.js --CLUSTER

Correr servidor modo FORK:

nodemon server.js
nodemon server.js --FORK

matar proceso Powershell:

taskkill /pid <numero de proceso> /f
ejemplo: taskkill /pid 6548 /f

PM2: instalacion forma global npm i pm2 -g

primero correr el servidor en modo cluster

Correr servidor modo Cluster:
pm2 start server.js --name="server1" --watch -i max -- --p 8081 (a mi me funciono asignarle el puerto con: -- --p 8081 sino probar con: --p 8081)

Correr servidor modo Fork:
pm2 start server.js --name="server2" --watch

Listar las aplicaciones que se estan ejecutando:
pm2 list

Borrar una aplicacion que se este ejecutando:

        pm2 delete <id>    ej: pm2 delete 10

Borrar todas las aplicaciones que se ejecutan :

        pm2 delete all

consigna 2:

antes crear los servidores con los puertos pedidos con pm2

modo Fork:

pm2 start server.js --name="server1" --watch

modo Cluster con el max de cores: descomentar lineas en nginx.config

pm2 start server.js --name="server2" --watch -i max -- --PORT 8081

modo Cluster de a uno:

pm2 start server.js --name="server3" --watch -i 1 -- --PORT 8082
pm2 start server.js --name="server4" --watch -i 1 -- --PORT 8083
pm2 start server.js --name="server5" --watch -i 1 -- --PORT 8084
pm2 start server.js --name="server6" --watch -i 1 -- --PORT 8085

    crear lo carpeta temp en clase-30/desafioEntregable.

    abrir la ruta del archivo nginx.exe en CMD: ejecutar:  .\nginx.exe

    cambiar contenido del archivo nginx.conf para probar el cluster max en caso de crearlo en el puerto 8081

    Luego de realizar cambios en el archivo config: ./nginx.exe -s reload

ruta para golpear = localhost/api/randoms?cant=500000 o cambiar valor para probar;
