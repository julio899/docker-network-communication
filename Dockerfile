# Usa una imagen base oficial de Node.js
FROM node:16.20.2
# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3020

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]

# docker build . -t mockexpress
# docker run --rm -p 3000:3000 --name helloexpress --network my_network mockexpress
# docker run -d --rm --name rabbitmq_container --network my_network --hostname rabbitqm -p 15672:15672 -p 5672:5672 rabbitmq:3.12-management
# docker run -d --rm -p 3000:3020 --name express_container --network my_network -e RABBITMQ_HOST=rabbitmq_container mockexpress:latest

# connectar contenedor a la red
# docker network connect my_network rabbitmq_container

# verificar que los contenedores esten en la misma red
# docker network inspect my_network


# mostrar las ultimas 10 lineas de los logs
# docker logs rabbitmq_container -n 10


# ejecutar comando en container
# docker exec -it express_container ping rabbitmq_container
# docker exec -it express_container ls

# install into container
# docker exec -it express_container sh -c "apt-get update && apt-get install -y iputils-ping && ping rabbitmq_container"
# docker exec -it express_container sh -c "apk add --no-cache iputils && ping rabbitmq_container"

# detener y remover containers
# docker stop express_container rabbitmq_container && docker rm express_container rabbitmq_container
