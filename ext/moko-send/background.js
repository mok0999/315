chrome.runtime.onMessage.addListener(function(msg){
  if(!msg||msg.type!=='moko-send'||!msg.url)return;
  chrome.tabs.query({url:'https://mok0999.github.io/315/chat.html*'},function(tabs){
    var tab=tabs&&tabs[0];
    if(tab){
      chrome.tabs.update(tab.id,{url:msg.url,active:true});
      chrome.windows.update(tab.windowId,{focused:true});
    }else{
      chrome.tabs.create({url:msg.url});
    }
  });
});
