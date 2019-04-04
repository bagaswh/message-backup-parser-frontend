import { MessageGroup, Message } from 'message-backup-parser';

export default class Search {
  static search(str: string, data: MessageGroup[]) {
    const regex = new RegExp(str, 'ig');

    const groups = data.slice();
    const match: (MessageGroup & { fullMessages: Message[] })[] = [];
    let currentDate = '';
    let index = 0;
    groups.forEach(group => {
      group.messages.forEach(msg => {
        if (msg.messageContent.match(regex)) {
          const messageResult = {
            ...msg,
            messageContent: msg.messageContent.replace(regex, '<b>$&</b>')
          };
          if (group.dateBegin != currentDate) {
            match.push({
              dateBegin: group.dateBegin,
              messages: [messageResult],
              fullMessages: group.messages.map(msg => {
                const messageResult = {
                  ...msg,
                  messageContent: msg.messageContent.replace(regex, '<b>$&</b>')
                };
                return messageResult;
              })
            });
            currentDate = group.dateBegin;
          } else if (match[index - 1]) {
            match[index - 1].messages.push(messageResult);
          }
          index++;
        }
      });
    });

    return match;
  }
}
