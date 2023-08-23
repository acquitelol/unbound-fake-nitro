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
        set: _set
    },
    patcher: {
        createPatcher
    }
} = window["unbound"];

export const ReactNative: typeof import('react-native') = window["ReactNative"]
export const React: typeof import('react') = window["React"];

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