//const  Kafka = require("kafkajs").Kafka;
const {Kafka} = require("kafkajs")
const msg = process.argv[2]
run()

async function run()
{
    try{

        const kafka = new Kafka({
            "clientid" : "myapp",
            "brokers" : ["192.168.2.13:9092"]
        })

        const producer = kafka.producer()
        console.log("iam connecting.....")
        await producer.connect()
        console.log("i am connected!!!")

        //A-M - Partition 0 ,N-Z - Partition - 1 // Terniary operator in Javascript
        const partition = msg[0] < "N" ? 0 : 1

        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value" : msg,
                    "partition": partition 
                }
            ]
        })
        console.log(`Done. Send sucessfully! ${JSON.stringify(result)}`)
        await producer.disconnect()

    }

    catch(ex){
        console.error(`Something bad happened ${ex}`)
    }

    finally{{
        process.exit(0)
    }}
}
