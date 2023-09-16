import { StyleSheet, Dimensions } from 'react-native';
// Obtain device display dimensions
const { width: devDisplayWidth, height: devDisplayHeight } = Dimensions.get('window');
// TODO: change var names
export default StyleSheet.create({
    alignElemsCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullscreenFill: {
        height: devDisplayHeight,
        width: devDisplayWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    /* Camera specific styles */
    bottomCamToolbar: {
        width: devDisplayWidth,
        position: 'absolute',
        height: 110,
        bottom: 0,
        display: 'flex',
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    /* Gallery specific styles */
    galleryContainer: { 
        bottom: 100 
    },
    galleryImageContainer: { 
        width: 75, 
        height: 75, 
        marginRight: 5 
    },
    galleryImage: { 
        width: 75, 
        height: 75 
    }
});