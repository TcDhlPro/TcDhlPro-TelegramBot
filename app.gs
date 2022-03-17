function doGet() {

  return HtmlService.createHtmlOutput("Hello World, 你好, 泥嚎, 腻猴贴");
}
function doPost(launch) {
  var switch_bot = JSON.parse(launch.postData.contents);
  var get_payload = preparePayload(switch_bot);
  var payload_list;

  if (Array.isArray(get_payload)){
    payload_list = get_payload;
  }else{
    payload_list = [get_payload]
  }

  for (var i = 0; i < payload_list.length; i++){
    get_payload = payload_list[i];
    if(get_payload){
      postTelegram(get_payload);
    }
  }
}

function postTelegram(postpayload) {
  var data = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(postpayload)
  }

  var response = UrlFetchApp.fetch("https://api.telegram.org/bot这里填写Token/", data);
  var res = JSON.parse(response);
  return res;
}



function getName(user) {
  var name = user.first_name;
  if (user.last_name) {
    name += " " + user.last_name;
  }

  return name;
}

function escapeMarkDown(toEscapeMsg) {
  var escapedMsg = toEscapeMsg.replace(/_/g, "\\_").replace(/\*/g, "\\*").replace(/\[/g, "\\[").replace(/`/g, "\\`");
  return escapedMsg;
}

function getMarkDownUserUrl(userName, userId) {
  return "[" + userName + "](tg://user?id=" + userId + ")";
}


function getMentionName(user) {
  var username = user.username;
  var mentionName = "";
  var name = getName(user);
  
  if (!name) {
    name = "> Who <";
  }

  mentionName = getMarkDownUserUrl(escapeMarkDown(name), user.id);
  return mentionName;
}


function getRandom(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum);
      break;
    case 2:
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
      break;
    default:
      return 0;
      break;
  }
}
function createArray(minNum, maxNum) {
  set_list_array = [];

  for (var i = 0; i < 10; i++) {
    set_list_array.push(getRandom(minNum, maxNum));
  }
}
function createkeyboardButtonArray(maxNum) {
  ckbBA_array = new Array(maxNum)
    .fill(0)
    .map((v, i) => i + 0)
    .sort(() => 0.5 - Math.random())
    .filter((v, i) => i < 6);
}


function coreFavoritesText() {
  var core_favorites_text = {
    favorites_text: {
      bot_messages: [
        '*这里可以放机器人的自我介绍*',
        'cGF5bG9hZF8w'
      ],
      bot_callback_query: [
        '*计算错误, 继续保持禁言状态!!!\n\n如需帮助,请联系:\n群主 >〖@某某某〗\n管理 >〖@某某某〗\n标准联系内容(XXXXXXXXXXXXXXXX)*',
        '*计算正确, 成功解除禁言状态!!!*',
        '3',
      ],
      message_new_chat_member: [
        "*这里可以放机器人的自我介绍\n欢迎新成员〖*",
        "*〗入群\n快速计算,并在下方选择正确的答案:\n『*",
        " *= ???』\n初始会话状态: 永久禁言*  *验证时间:",
        "*\n*选择答案要细心, 仅有一次机会\n*",
      ],
    }
  };
  return core_favorites_text;
}


function preparePayload(bot) {
  if (bot.callback_query) {
    str_callback_query_data = bot.callback_query.data.split('+');
    var link_coreFavoritesText = coreFavoritesText().favorites_text;

    if (bot.callback_query.from.id != str_callback_query_data[2]){
      var show_alert_text = bot.callback_query.id + "+" + "【 Error > 无验证权限!!! 】"
      return corePayload({payLoadText_5:show_alert_text});
    }

    if (bot.callback_query.from.id = str_callback_query_data[2]){
      if (str_callback_query_data[0] != str_callback_query_data[1]) {
        var payload_text = "注释: 计算错误!"
          + "+"
          + "*〖*"+getMentionName(bot.callback_query.from)+"*〗*"
          + "+"
          + link_coreFavoritesText.bot_callback_query[0]
          + "+" 
          + bot.callback_query.message.message_id 
          + "+" 
          + bot.callback_query.message.chat.id;
        var unban_payload_text = undefined;
      }else {
        var payload_text = "注释: 计算正确!"
          + "+"
          + "*〖*"+getMentionName(bot.callback_query.from)+"*〗*"
          + "+"
          + link_coreFavoritesText.bot_callback_query[1]
          + "+"
          + bot.callback_query.message.message_id 
          + "+"
          + bot.callback_query.message.chat.id;
        var unban_payload_text = bot.callback_query.message.chat.id + "+" + bot.callback_query.from.id;// 计算正确给用户解除禁言状态
      }
      return corePayload({payLoadText_2:payload_text, payLoadText_7:unban_payload_text});
    }
  }

  if (bot.message) {
    bot.message.chat.id = bot.message.chat.id + '';
    var link_coreFavoritesText = coreFavoritesText().favorites_text;

    if (bot.message.new_chat_member) {
      createkeyboardButtonArray(6);
      createArray(10, 300);
      add_array = set_list_array[ckbBA_array[0]] + set_list_array[ckbBA_array[1]];

      var utc_cn_time = Utilities.formatDate(new Date(), "GMT+8", "yyyy年MM月dd日' 'HH:mm:ss' '");
      var payload_text = link_coreFavoritesText.message_new_chat_member[0]
        + getMentionName(bot.message.new_chat_member)
        + link_coreFavoritesText.message_new_chat_member[1]
        + set_list_array[ckbBA_array[0]] + '+' + set_list_array[ckbBA_array[1]]
        + link_coreFavoritesText.message_new_chat_member[2] + utc_cn_time + link_coreFavoritesText.message_new_chat_member[3]
        + "++" 
        + bot.message.chat.id;
      var ban_payload_text = bot.message.chat.id + "+" + bot.message.new_chat_member.id;
      var keyboardButton_num_1 = set_list_array[ckbBA_array[0]] + set_list_array[ckbBA_array[1]];// 正确答案
      var keyboardButton_num_2 = set_list_array[ckbBA_array[1]] + set_list_array[ckbBA_array[2]];
      var keyboardButton_num_3 = set_list_array[ckbBA_array[2]] + set_list_array[ckbBA_array[3]];
      var keyboardButton_num_4 = set_list_array[ckbBA_array[3]] + set_list_array[ckbBA_array[4]];
      var keyboardButton_num_5 = set_list_array[ckbBA_array[4]] + set_list_array[ckbBA_array[5]];
      var keyboardButton_num_6 = set_list_array[ckbBA_array[5]] + set_list_array[ckbBA_array[0]];
      var keyboardButton_num_list = [
        keyboardButton_num_1,
        keyboardButton_num_2,
        keyboardButton_num_3,
        keyboardButton_num_4,
        keyboardButton_num_5,
        keyboardButton_num_6
      ];

      inlineKeyboardMarkup = {};
      /**
      * @type {{ text: any; callback_data: string; }[][]}
      */
      var inlineKeyboardMarkup_inline_keyboard = inlineKeyboardMarkup.inline_keyboard = [];
      var keyboardRow1 = [];
      var keyboardButton1 = {
        text: keyboardButton_num_list[ckbBA_array[0]],
        callback_data: keyboardButton_num_list[ckbBA_array[0]] + "+" + add_array + "+" + bot.message.new_chat_member.id
      };
      var keyboardButton2 = {
        text: keyboardButton_num_list[ckbBA_array[1]],
        callback_data: keyboardButton_num_list[ckbBA_array[1]] + "+" + add_array + "+" + bot.message.new_chat_member.id
      };

      var keyboardRow2 = [];
      var keyboardButton3 = {
        text: keyboardButton_num_list[ckbBA_array[2]],
        callback_data: keyboardButton_num_list[ckbBA_array[2]] + "+" + add_array + "+" + bot.message.new_chat_member.id
      };
      var keyboardButton4 = {
        text: keyboardButton_num_list[ckbBA_array[3]],
        callback_data: keyboardButton_num_list[ckbBA_array[3]] + "+" + add_array + "+" + bot.message.new_chat_member.id
      };

      var keyboardRow3 = [];
      var keyboardButton5 = {
        text: keyboardButton_num_list[ckbBA_array[4]],
        callback_data: keyboardButton_num_list[ckbBA_array[4]] + "+" + add_array + "+" + bot.message.new_chat_member.id
      };
      var keyboardButton6 = {
        text: keyboardButton_num_list[ckbBA_array[5]],
        callback_data: keyboardButton_num_list[ckbBA_array[5]] + "+" + add_array + "+" + bot.message.new_chat_member.id
      };

      keyboardRow1.push(keyboardButton1);
      keyboardRow1.push(keyboardButton2);

      keyboardRow2.push(keyboardButton3);
      keyboardRow2.push(keyboardButton4);

      keyboardRow3.push(keyboardButton5);
      keyboardRow3.push(keyboardButton6);

      inlineKeyboardMarkup_inline_keyboard.push(keyboardRow1);
      inlineKeyboardMarkup_inline_keyboard.push(keyboardRow2);
      inlineKeyboardMarkup_inline_keyboard.push(keyboardRow3);

      return corePayload({payLoadText_3:payload_text, payLoadText_6:ban_payload_text});
    }

    if (bot.message.left_chat_member) {
      var left_chat_member_text1 = "*〖*";
      var left_chat_member_text2 = "*〗离开了本群！*";
      var left_chat_member_text3 = bot.message.chat.id;
      var payload_text = "注释: 用户离群通知!"
        + "+"
        + left_chat_member_text1
        + getMentionName(bot.message.left_chat_member)
        + left_chat_member_text2
        + "+"
        + left_chat_member_text3;
      //[4]
      return corePayload({payLoadText_4:payload_text});
    }
    bot.message.text = bot.message.text.toLowerCase();
    if (bot.message.text.indexOf("/about") === 0) {
      var payload_text = link_coreFavoritesText.bot_messages[0] + "+" + bot.message.chat.id;

      //[1]
      return corePayload({payLoadText_1:payload_text});
    }
    
    if (bot.message.text){
      var payload_text = link_coreFavoritesText.bot_messages[1] + "+" + bot.message.chat.id;

      //[0]
      return corePayload({payLoadText_0:payload_text});
    }
  }
}
