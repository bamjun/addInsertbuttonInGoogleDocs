/**
 * onOpen 함수를 실행해야지 독스에 메뉴가 생성됨.  
 *
 * Extending Google Docs developer guide:
 *     https://developers.google.com/apps-script/guides/docs
 *
 * Document service reference documentation:
 *     https://developers.google.com/apps-script/reference/document/
 */
function onOpen() {
    // 메뉴이름을 바꾸면 독스를 새로고침해야함.
    DocumentApp.getUi().createMenu('커스텀')
        .addItem('현재날짜 추가', 'insertAtCursor')
        .addToUi();
  }
  
  function insertAtCursor() {
    var cursor = DocumentApp.getActiveDocument().getCursor();
    
    if (cursor) {
      // Format the date and time in a basic format.
      var now = new Date();
      var formattedDate = Utilities.formatDate(now, "GMT+9", "hh:mm yyyy-MM-dd");
      
      // Manually determine AM/PM and the day of the week in Korean.
      var hours = now.getHours();
      var amPm = hours >= 12 ? '오후' : '오전'; // This will be in English.
  
      // Mapping days of the week to Korean.
      var days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      var dayOfWeek = days[now.getDay()]; // Gets the Korean day of the week.
  
      // Combine everything into one string.
      var dateStr = amPm + ' ' + formattedDate + ' ' + dayOfWeek;
  
      var element = cursor.insertText(dateStr);
      if (element) {
        element.setBold(false);
      } else {
        DocumentApp.getUi().alert('이 커서 위치에는 날짜를 추가할 수 없습니다.');
      }
    } else {
      DocumentApp.getUi().alert('커서를 찾을 수 없습니다. 날짜를 추가할 위치에 커서를 위치해주세요. (블록지정하면 안됨.)');
    }
  }
  