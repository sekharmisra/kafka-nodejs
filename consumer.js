//const  Kafka = require("kafkajs").Kafka;
const {Kafka} = require("kafkajs")

run()

async function run()
{
    try{

        const kafka = new Kafka({
            "clientid" : "myapp",
            "brokers" : ["192.168.2.13:9092"]
        })

        const consumer = kafka.consumer({"groupId" : "test"})
        console.log("iam connecting.....")
        await consumer.connect()
        console.log("i am connected!!!")      
        //await consumer.disconnect()

        consumer.subscribe(
            {
                "topic": "Users",
                "fromBeginning": true
            }
        )


        await consumer.run(
            {
                "eachMessage": async result => {

                    console.log(`received message ${result.message.value} on partition ${result.partition}`)
                }
            }
        )

    }

    catch(ex){
        console.error(`Something bad happened ${ex}`)
    }

    finally{
        
    }
}
