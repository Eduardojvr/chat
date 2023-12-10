# Compilar a DLL 

### Compilar com 64 bits
gcc -m64 -shared -o dataHoraAtual.dll dataHoraAtual.c

# Iniciar o ZooKeeper
bin\zkServer.cmd

# Iniciar o Apache Kafka
gradle jar
.\bin\windows\kafka-server-start.bat .\config\server.properties

## Criar tópico
.\bin\windows\kafka-topics.bat --create --topic meu-topico --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

## Produzir e Consumir Mensagens:
- Consumer
.\bin\windows\kafka-console-producer.bat --topic meu-topico --bootstrap-server localhost:9092

- Produce
.\bin\windows\kafka-console-consumer.bat --topic meu-topico --bootstrap-server localhost:9092
