# INFO Starting


## Compilar imagen (creación de imagen)
 docker build . -t mockexpress


# creacion de red
 docker network create --attachable my_network

## Ejecucion de contenedores

**Rabbitmq**
> docker run -d --rm --name rabbitmq_container --network my_network --hostname rabbitqm -p 15672:15672 -p 5672:5672 rabbitmq:3.12-management

**Express**
> docker run -d --rm -p 3000:3020 --name express_container --network my_network -e RABBITMQ_HOST=rabbitmq_container mockexpress:latest



### verificar que los contenedores esten en la misma red
 docker network inspect my_network

### connectar contenedor a la red
 docker network connect my_network rabbitmq_container


### mostrar las ultimas 10 lineas de los logs
 docker logs rabbitmq_container -n 10


### ejecutar comando en container
 docker exec -it express_container ping rabbitmq_container
 docker exec -it express_container ls


### install into container
 docker exec -it express_container sh -c "apt-get update && apt-get install -y iputils-ping && ping rabbitmq_container"
 docker exec -it express_container sh -c "apk add --no-cache iputils && ping rabbitmq_container"


### detener y remover containers
 docker stop express_container rabbitmq_container && docker rm express_container rabbitmq_container
