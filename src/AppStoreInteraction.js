import { Linking, Platform } from 'react-native';

export const openAppPageInStore = (appStoreId, playStoreId) => {
    switch (Platform.OS) {
        case 'ios':
            Linking.openURL(`https://itunes.apple.com/app/${appStoreId}`);
            break;

        case 'android':
            Linking.openURL(`https://play.google.com/store/apps/details?id=${playStoreId}`);
            break;

        default:
    }
};
