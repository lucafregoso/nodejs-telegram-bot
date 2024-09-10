const { Telegraf } = require("telegraf");
const fs = require("node:fs");

const bot = new Telegraf(process.env.BOT_TOKEN);
const events = [
  //   "text",
  //   "sticker",
  //   "animation",
  //   "audio",
  //   "document",
  //   "photo",
  //   "video",
  //   "video_note",
  //   "voice",
  //   "callback_query",
  //   "channel_post",
  "chat_member",
  //   "chosen_inline_result",
  //   "edited_channel_post",
  //   "message_reaction",
  //   "message_reaction_count",
  //   "edited_message",
  //   "inline_query",
  "message",
  //   "my_chat_member",
  //   "pre_checkout_query",
  //   "poll_answer",
  //   "poll",
  //   "shipping_query",
  //   "chat_join_request",
  //   "chat_boost",
  //   "removed_chat_boost",
  //   "has_media_spoiler",
  //   "contact",
  //   "dice",
  //   "location",
  "new_chat_members",
  //   "left_chat_member",
  //   "new_chat_title",
  //   "new_chat_photo",
  //   "delete_chat_photo",
  //   "group_chat_created",
  //   "supergroup_chat_created",
  //   "channel_chat_created",
  //   "message_auto_delete_timer_changed",
  //   "migrate_to_chat_id",
  //   "migrate_from_chat_id",
  //   "pinned_message",
  //   "invoice",
  //   "successful_payment",
  //   "users_shared",
  //   "chat_shared",
  //   "connected_website",
  //   "write_access_allowed",
  //   "passport_data",
  //   "proximity_alert_triggered",
  //   "boost_added",
  //   "forum_topic_created",
  //   "forum_topic_edited",
  //   "forum_topic_closed",
  //   "forum_topic_reopened",
  //   "general_forum_topic_hidden",
  //   "general_forum_topic_unhidden",
  //   "giveaway_created",
  //   "giveaway",
  //   "giveaway_winners",
  //   "giveaway_completed",
  //   "video_chat_scheduled",
  //   "video_chat_started",
  //   "video_chat_ended",
  //   "video_chat_participants_invited",
  //   "web_app_data",
  //   "game",
  //   "story",
  //   "venue",
  //   "forward_date",
];
events.forEach((event) => {
  bot.on(event, (ctx) => {
    console.log("catch event", event, ctx);

    let content = JSON.stringify(ctx, null, 2);
    content += "\n";
    content += "-----------------------------------";
    content += "\n";
    content += JSON.stringify(event, null, 2);

    fs.writeFile("logs/" + new Date().getTime() + ".log", content, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
        console.log("file written successfully");
      }
    });
    if (event === "message" && ctx?.message?.new_chat_members?.length > 0) {
      const user = ctx.message.new_chat_members[0];
      let welcomeMessage = `${process.env.WELCOME_MESSAGE}`
        .replace("${user.first_name}", user.first_name)
        .replace("${user.username}", user.username)
        .split("\\n")
        .join("\n");
      ctx.reply(welcomeMessage);
    }
  });
});
bot.launch({
  allowedUpdates: ["chat_member", "new_chat_members", "message"],
});
// bot.on("chat_member", (ctx) => {
//   const user = ctx.message.new_chat_members[0];
//   ctx.reply(`chat_member Welcome, ${user.first_name}!`);
// });
// bot.on("new_chat_members", (ctx) => {
//   const user = ctx.message.new_chat_members[0];
//   ctx.reply(`new_chat_members Welcome, ${user.first_name}!`);
// });
// bot.start((ctx) => {
//   ctx.reply("Hello " + ctx.from.first_name + "!");
// });

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
