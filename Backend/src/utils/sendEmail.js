const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: { ToAddresses: [toAddress] },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body || "No body provided"}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: body || "No body provided",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject || "DevTinder Notification",
      },
    },
    Source: fromAddress,
  });
};

const run = async (subject, body) => {
  const sendEmailCommand = createSendEmailCommand(
    "saidushyant04@gmail.com", // To address
    "sai@devtinder123.run.place", // From address (must be verified in SES)
    subject || "DevTinder Notification", // ✅ pass subject here
    body || "You have a new update on DevTinder!" // ✅ pass body here
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };
