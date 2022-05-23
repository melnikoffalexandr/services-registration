const { Telegram } = window;
const { WebApp } = Telegram;

export const webAppChatId = () => WebApp.initDataUnsafe.user?.id;
/* export const webAppMainButtonSetText = (text: string) => WebApp.MainButton.setText(text);
export const webAppMainButtonShow = () => WebApp.MainButton.show();
export const webAppMainButtonClick = (callback: any) => WebApp.MainButton.onClick(callback);
export const webAppMainButtonHide = () => WebApp.MainButton.hide(); */
export const webAppMainButtonShowProgress = (leaveActive?: boolean) => WebApp.MainButton.showProgress(leaveActive);
export const webAppClose = () => WebApp.close();
export const webAppIsExpanded = () => WebApp.isExpanded;
export const webAppExpand = () => WebApp.expand();
