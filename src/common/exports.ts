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

export const {
    ScrollView,
    TouchableOpacity, 
    View, 
    LayoutAnimation: { 
        create, 
        configureNext 
    }
} = window["ReactNative"];
export const React = window["React"];