# Kafka
Zoo keeper - https://www.atatus.com/glossary/zookeeper/#:~:text=A%20Zookeeper%20is%20a%20central,operating%20as%20a%20single%20unit.

*************************************
Step 1 - Spin up zookeeper on Docker
*************************************

Test docker - PS C:\Users\sekha> docker run hello-world

PS C:\Users\sekha> docker run --name zookeeper -p 2181:2181 zookeeper

********************************
Step 2 - Spin up Kafka Broker
*********************************

E is environment variable. Kafka assumes that there are 3 instances of Kafka broker running by default. Hence it is important to apply KAFKA offset topic replication factor = 1 to inform that there is only one broker running for this setup. 

PS C:\Users\sekha> docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<ip address of the localhost on the network>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<ip address of the localhost on the network>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

For above instance my ip address was 192.168.2.13

So the command which worked for me at this time was listed below:

docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=192.168.2.13:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.2.13:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

Else I was getting connection error. The Kafka was not able to communicate to ZooKeeper. Connection refused, Connection time out and Kafka stopped running. 

Earlier I was trying with below commands which did not work for me locally:

docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=DESKTOP-ECLPUH6:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://DESKTOP-ECLPUH6:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

Finding my IP address in the network and substituting that with above helped running Kafka container as well. 

Below video was helpful in understanding that 
Install Apache Kafka using Docker | How to install Kafka on docker ?

************************
Coding Example
************************
	• Initialize NPM - npm init -y 
	Npm install kafkajs

	***************
	Producer result
	***************
	
	PS C:\Sekhar\2023\HA\Kafka> node producer.js test
	{"level":"WARN","timestamp":"2023-08-16T10:34:23.126Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [object Object]
	PS C:\Sekhar\2023\HA\Kafka> node producer.js test
	{"level":"WARN","timestamp":"2023-08-16T10:37:27.188Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":1,"errorCode":0,"baseOffset":"1","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> node producer.js test1
	{"level":"WARN","timestamp":"2023-08-16T10:37:38.061Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":1,"errorCode":0,"baseOffset":"2","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> node producer.js ANNA 
	{"level":"WARN","timestamp":"2023-08-16T10:37:47.240Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":0,"errorCode":0,"baseOffset":"0","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> node producer.js Zen
	{"level":"WARN","timestamp":"2023-08-16T10:37:56.023Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":1,"errorCode":0,"baseOffset":"3","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> {"level":"WARN","timestamp":"2023-08-16T10:37:56.023Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}

	***************
	Consumer result
	***************
	
		PS C:\Sekhar\2023\HA\Kafka> node consumer.js
	iam connecting.....
	i am connected!!!
	{"level":"INFO","timestamp":"2023-08-16T10:52:34.543Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"test"}
	{"level":"ERROR","timestamp":"2023-08-16T10:52:34.644Z","logger":"kafkajs","message":"[Connection] Response GroupCoordinator(key: 10, version: 2)","broker":"192.168.2.13:9092","clientId":"kafkajs","error":"The group coordinator is not available","correlationId":3,"size":55}
	{"level":"ERROR","timestamp":"2023-08-16T10:52:34.965Z","logger":"kafkajs","message":"[Connection] Response GroupCoordinator(key: 10, version: 2)","broker":"192.168.2.13:9092","clientId":"kafkajs","error":"The group coordinator is not available","correlationId":4,"size":55}
	{"level":"ERROR","timestamp":"2023-08-16T10:52:35.591Z","logger":"kafkajs","message":"[Connection] Response GroupCoordinator(key: 10, version: 2)","broker":"192.168.2.13:9092","clientId":"kafkajs","error":"The group coordinator is not available","correlationId":5,"size":55}
	{"level":"INFO","timestamp":"2023-08-16T10:52:39.759Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test","memberId":"kafkajs-f68d966c-d220-409f-a63d-56f3986977af","leaderId":"kafkajs-f68d966c-d220-409f-a63d-56f3986977af","isLeader":true,"memberAssignment":{"Users":[0,1]},"groupProtocol":"RoundRobinAssigner","duration":5205}
	received message ANNA on partition 0
	received message test on partition 1
	received message test on partition 1
	received message test1 on partition 1
	received message Zen on partition 1
	
	PS C:\Sekhar\2023\HA\Kafka> node producer Barbara
	{"level":"WARN","timestamp":"2023-08-16T11:10:24.948Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":0,"errorCode":0,"baseOffset":"3","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> node producer Zain
	{"level":"WARN","timestamp":"2023-08-16T11:10:46.551Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":1,"errorCode":0,"baseOffset":"12","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> node producer.js zookeeper
	{"level":"WARN","timestamp":"2023-08-16T11:11:28.320Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":1,"errorCode":0,"baseOffset":"13","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka> node producer.js Aarna
	{"level":"WARN","timestamp":"2023-08-16T11:11:47.434Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
	iam connecting.....
	i am connected!!!
	Done. Send sucessfully! [{"topicName":"Users","partition":0,"errorCode":0,"baseOffset":"4","logAppendTime":"-1","logStartOffset":"0"}]
	PS C:\Sekhar\2023\HA\Kafka>
	
	************************************
	Consumer 1  - Partition 0 - Parallel 
	************************************
		PS C:\Sekhar\2023\HA\Kafka> node consumer.js
	iam connecting.....
	i am connected!!!
	{"level":"INFO","timestamp":"2023-08-16T11:10:04.960Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"test"}
	{"level":"INFO","timestamp":"2023-08-16T11:10:08.004Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test","memberId":"kafkajs-63f89c01-a3a4-44b8-8a14-eeffffaffd0c","leaderId":"kafkajs-63f89c01-a3a4-44b8-8a14-eeffffaffd0c","isLeader":true,"memberAssignment":{"Users":[0,1]},"groupProtocol":"RoundRobinAssigner","duration":3035}
	{"level":"ERROR","timestamp":"2023-08-16T11:10:18.049Z","logger":"kafkajs","message":"[Connection] Response Heartbeat(key: 12, version: 3)","broker":"192.168.2.13:9092","clientId":"kafkajs","error":"The group is rebalancing, so a rejoin is needed","correlationId":10,"size":10}
	{"level":"ERROR","timestamp":"2023-08-16T11:10:18.053Z","logger":"kafkajs","message":"[Connection] Response Heartbeat(key: 12, version: 3)","broker":"192.168.2.13:9092","clientId":"kafkajs","error":"The group is rebalancing, so a rejoin is needed","correlationId":11,"size":10}
	{"level":"WARN","timestamp":"2023-08-16T11:10:18.053Z","logger":"kafkajs","message":"[Runner] The group is rebalancing, re-joining","groupId":"test","memberId":"kafkajs-63f89c01-a3a4-44b8-8a14-eeffffaffd0c","error":"The group is rebalancing, so a rejoin is needed"}
	{"level":"INFO","timestamp":"2023-08-16T11:10:18.066Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test","memberId":"kafkajs-63f89c01-a3a4-44b8-8a14-eeffffaffd0c","leaderId":"kafkajs-63f89c01-a3a4-44b8-8a14-eeffffaffd0c","isLeader":true,"memberAssignment":{"Users":[0]},"groupProtocol":"RoundRobinAssigner","duration":12}
	received message Barbara on partition 0
	received message Aarna on partition 0

	
	**************************************
	Consumer 2 Partition 1 - Parallel 
	**************************************
		PS C:\Sekhar\2023\HA\Kafka> node consumer.js
	iam connecting.....
	i am connected!!!
	{"level":"INFO","timestamp":"2023-08-16T11:10:14.343Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"test"}
	{"level":"INFO","timestamp":"2023-08-16T11:10:18.068Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test","memberId":"kafkajs-cfe0a481-e428-4e1f-b700-567b4030e195","leaderId":"kafkajs-63f89c01-a3a4-44b8-8a14-eeffffaffd0c","isLeader":false,"memberAssignment":{"Users":[1]},"groupProtocol":"RoundRobinAssigner","duration":3715}
	received message Zain on partition 1
received message zookeeper on partition 1
	


