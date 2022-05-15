type User = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    photo_url: string;
}

export interface TelegramApi {
    initData: string;
    initDataUnsafe: {
        query_id: string;
        user: User;
        receiver: User;
        start_param: string;
        auth_date: number;
        hash: string;
    };
    colorScheme: string;
    themeParams: {
        bg_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        button_text_color: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isActive: boolean;
        isProgressVisible: boolean;
        setText: (text: string) => void;
        // onClick: (callback) => void;
        show: () => void;
        hide: () => void;
        enable: () => void;
        disable: () => void;
        showProgress: (leaveActive: boolean) => void;
        hideProgress: () => void;
        setParams: (params: {
            text?: string, color?: string, text_color?: string, is_active?: boolean, is_visible?: boolean
        }) => void;
    };
    // onEvent: (eventType, eventHandler) => void;
    // offEvent: (eventType, eventHandler) => void;
    // sendData: (data) => void;
    ready: () => void;
    expand: () => void;
    close: () => void;
}


