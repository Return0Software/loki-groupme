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
  console.log(`Sending text (${text} with bot_id (${process.env.bot_id}))`);
  const json = {
    text,
    bot_id: process.env.bot_id
  };
  // got.post("https://api.groupme.com/v3/bots/post", { json });
};

export default (req: NowRequest, res: NowResponse) => {
  const groupMeReq = req.body;
  console.log(`GroupMeReq: ${JSON.stringify(groupMeReq)}`);
  console.log(`ENV variables ${JSON.stringify(process.env)}`);
  console.log(`bot_id ${JSON.stringify(process.env.bot_id)}`);

  switch (groupMeReq.text.toLowerCase()) {
    case "hey loki":
      sendMessage(`Hi ${name}`);
      break;
    default:
      break;
  }

  console.log("in the final block");
  res.json({ response: "done" });
};
