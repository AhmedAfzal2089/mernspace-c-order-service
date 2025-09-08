import { Consumer, EachMessagePayload, Kafka, Producer } from "kafkajs";
import { MessageBroker } from "../types/broker";
import { handleProductUpdate } from "../productCache/productUpdateHandler";
import { handleToppingUpdate } from "../toppingCache/toppingUpdateHandler";

export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;
  private producer: Producer;
  constructor(clientId: string, brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });
    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: clientId });
  }
  /**
   * Connect the consumer
   */
  async connectConsumer() {
    await this.consumer.connect();
  }
  /**
   * Connect the producer
   */
  async connectProducer() {
    this.producer.connect();
  }

  //@param topic - the topic send the message to
  //@param messsage - the message to send
  //@throws{Error} - when the produces is not connected

  async sendMessage(topic: string, message: string, key: string) {
    const data: { value: string; key?: string } = {
      value: message,
    };
    if (key) {
      data.key = key; 
    }
    await this.producer.send({
      topic,
      messages: [data],
    });
  }
  /**
   * Disconnect the consumer
   */
  async disconnectConsumer() {
    await this.consumer.disconnect();
  }
  /**
   * Disconnect the producer
   */
  async disconnectProducer() {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }
  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.consumer.subscribe({ topics, fromBeginning });
    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        // logic to handle incoming messages
        switch (topic) {
          case "product":
            await handleProductUpdate(message.value.toString());
            return;
          case "topping":
            await handleToppingUpdate(message.value.toString());
            return;
          default:
            console.log("Doing nothing.... ");
        }
        console.log({
          value: message.value.toString(),
          topic,
          partition,
        });
      },
    });
  }
}
