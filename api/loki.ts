import { NowRequest, NowResponse } from "@now/node";
import got from "got";

/*
  This endpoint should get hit with callback URL. Doesn't seem you can respond
  with a message so have to send one on your own. CB data looks like below

  {
  "attachments": [],
  "avatar_url": "https://i.groupme.com/123456789",
  "created_at": 1302623328,
  "group_id": "1234567890",
  "id": "1234567890",
  "name": "John",
  "sender_id": "12345",
  "sender_type": "user",
  "source_guid": "GUID",
  "system": false,
  "text": "Hello world ☃☃",
  "user_id": "1234567890"
}
*/

const sendMessage = async (text: string) => {
  console.log(`Sending text (${text})`);
  const json = {
    text,
    bot_id: process.env.BOT_ID
  };
  await got.post("https://api.groupme.com/v3/bots/post", {
    json
  });
  console.log("response done");
};

export default async (req: NowRequest, res: NowResponse) => {
  const groupMeReq = req.body;
  console.log(`GroupMeReq: ${JSON.stringify(groupMeReq)}`);

  switch (groupMeReq.text.toLowerCase()) {
    case "hey loki":
      await sendMessage(`Hi ${groupMeReq.name}`);
      break;
    default:
      break;
  }

  console.log("in the final block");
  res.json({ response: "done" });
};
