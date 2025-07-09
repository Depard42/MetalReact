
export function setupWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
      // Разворачивает WebApp на весь экран внутри Telegram
      window.Telegram.WebApp.expand();
      // Включает подтверждение закрытия WebApp
      window.Telegram.WebApp.enableClosingConfirmation();
    }
}

export function getCredsTelegram() {
  const WebApp = window.Telegram.WebApp;
  WebApp.expand()
  let initDataURLSP = new URLSearchParams(WebApp.initData);
  var hash = initDataURLSP.get('hash');

  initDataURLSP.delete('hash');
  initDataURLSP.sort();
  var checkDataString = initDataURLSP.toString().replaceAll('&', '\n');

  const auth_data = {
      hash: hash,
      checkDataString: checkDataString,
  };

  return auth_data
}