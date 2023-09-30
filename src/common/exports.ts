export const {
    utilities,
    metro,
    components,
    assets: {
        getIDByName
    },
    storage: {
        useSettingsStore,
        get: _get,
        set: _set,
        on
    },
    patcher: {
        createPatcher
    }
} = window['unbound'];

export const UserStore = metro.stores.Users;
export const ReactNative: typeof import('react-native') = window['ReactNative']
export const React: typeof import('react') = window['React'];

export const [
    Permission,
    Uploading,
    Messages
] = metro.findByProps(
    { params: ['canUseEmojisEverywhere'], lazy: true },
    { params: ['uploadLocalFiles'], lazy: true },
    { params: ['sendMessage', 'receiveMessage'], lazy: true },
    { bulk: true }
);

export const {
    ScrollView,
    TouchableOpacity,
    View,
    LayoutAnimation: {
        create,
        configureNext
    },
    FlatList
} = ReactNative;