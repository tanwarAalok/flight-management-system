const amqplib = require("amqplib");
const { EmailService } = require("../services");

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("notification-queue");

    await channel.consume("notification-queue", async (data) => {
      const body = JSON.parse(`${Buffer.from(data.content)}`);
      await EmailService.sendEmail(
        "iamvrajput14@gmail.com",
        body.recepientEmail,
        body.subject,
        body.text
      );
      channel.ack(data);
    });

    console.log("Successfully completed queue requests");
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
    connectQueue
}