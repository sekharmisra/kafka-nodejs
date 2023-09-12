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

        const admin = kafka.admin();
        console.log("iam connecting.....")
        await admin.connect()
        console.log("i am connected!!!")

        //A-M - Partition 1, N-Z - Partition 2
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })

        console.log("Done. Created successfully!")
        await admin.disconnect()

    }

    catch(ex){
        console.error(`Something bad happened ${ex}`)
    }

    finally{{
        process.exit(0)
    }}
}
