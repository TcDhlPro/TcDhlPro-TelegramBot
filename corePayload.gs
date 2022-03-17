function corePayload({
  payLoadText_0, 
  payLoadText_1, 
  payLoadText_2, 
  payLoadText_3, 
  payLoadText_4, 
  payLoadText_5,
  payLoadText_6,
  payLoadText_7,}){
  var payload_0;
  var payload_1;
  var payload_2;
  var payload_3;
  var payload_4;
  var payload_5;
  var payload_6;
  var payload_7;

  if (payLoadText_0 != undefined){
    var str_payLoadText_0 = payLoadText_0.split('+');
    payload_0 = {
      "method": "getChat",
      "chat_id": str_payLoadText_0[1],
    };

    return payload_0;
  }

  if (payLoadText_1 != undefined){
    var str_payLoadText_1 = payLoadText_1.split('+');
    payload_1 = {
      "method": "sendMessage",
      "chat_id": str_payLoadText_1[1],
      "text": str_payLoadText_1[0],
      "parse_mode": "Markdown",
      "disable_web_page_preview": false,
    };

    return payload_1;
  }

  if (payLoadText_2 != undefined){
    var payload_list = [];
    var str_payLoadText_2 = payLoadText_2.split('+');
    payload_2 = {
      "method": "editMessageText",
      "chat_id": str_payLoadText_2[4],
      "message_id": str_payLoadText_2[3],
      "text": str_payLoadText_2[1]+str_payLoadText_2[2],
      "parse_mode": "Markdown",
      "disable_web_page_preview": true,
    };
    payload_list.push(payload_2);

    if (payLoadText_7 != undefined){
      var str_payLoadText_7 = payLoadText_7.split('+');
      payload_7 = {
        "method": "restrictChatMember",
        "chat_id": str_payLoadText_7[0],
        "user_id": str_payLoadText_7[1],
        "can_send_messages": true,
        "can_send_polls": true,
        "can_send_media_messages": true,
        "can_send_other_messages": true,
        "can_add_web_page_previews": true,
      };
      payload_list.push(payload_7);
    }

    return payload_list;
  }

  if (payLoadText_3 != undefined){
    var payload_list = [];
    var str_payLoadText_3 = payLoadText_3.split('++');
    payload_3 = {
      "method": "sendMessage",
      "chat_id": str_payLoadText_3[1],
      "text": str_payLoadText_3[0],
      "parse_mode": "Markdown",
      "disable_web_page_preview": true,
    };

    payload_3.reply_markup = inlineKeyboardMarkup;
    payload_list.push(payload_3);

    if (payLoadText_6 != undefined){
      var str_payLoadText_6 = payLoadText_6.split('+');
      payload_6 = {
        "method": "restrictChatMember",
        "chat_id": str_payLoadText_6[0],
        "user_id": str_payLoadText_6[1],
        "can_send_messages": false,
        "can_send_polls": false,
        "can_send_media_messages": false,
        "can_send_other_messages": false,
        "can_add_web_page_previews": false,
      };
      payload_list.push(payload_6);
    }
    
    return payload_list;
    // return payload_3;
  }

  if (payLoadText_4 != undefined){
    var str_payLoadText_4 = payLoadText_4.split('+');
    payload_4 = {
      "method": "sendMessage",
      "chat_id": str_payLoadText_4[2],
      "text": str_payLoadText_4[1],
      "parse_mode": "Markdown",
      "disable_web_page_preview": true,
    }

    return payload_4;
  }

  if (payLoadText_5 != undefined){
    var str_payLoadText_5 = payLoadText_5.split('+');
    payload_5 = {
      "method": "answerCallbackQuery",
      "callback_query_id": str_payLoadText_5[0],
      "text": str_payLoadText_5[1],
      "show_alert": true,
      "cache_time": 120,
    }

    return payload_5;
  }
}
