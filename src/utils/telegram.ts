const webApp = window.Telegram.WebApp;
export const webAppChatId = () => webApp.initDataUnsafe.user?.id;
export const webAppReady = () => webApp.ready();
export const webAppMainButtonShowProgress = (leaveActive?: boolean) => webApp.MainButton.showProgress(leaveActive);
export const webAppClose = () => webApp.close();
export const webAppIsExpanded = () => webApp.isExpanded;
export const webAppExpand = () => webApp.expand();
export const webAppTheme = () => ({
    colorScheme: webApp.colorScheme,
    textColor: webApp.themeParams.text_color,
    backgroundColor: webApp.themeParams.bg_color,
});
