import { StyleSheet, Dimensions } from 'react-native';
// Obtain device display dimensions
const { width: devDisplayWidth, height: devDisplayHeight } = Dimensions.get('window');

export default StyleSheet.create({
    alignElemsHorizCenter: {
        flex: 1,
        alignItems: 'center',  // Horizontally center
        justifyContent: 'flex-start',
    },
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
    permissionsDeniedView: {
        gap: '30px 0px',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
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
    galPage: {
        gap: 10,
        paddingTop: 10,
    },
    galleryPreviewContainer: { 
        bottom: 100,
    },
    galleryImageContainer: { 
        width: 75, 
        height: 75, 
        marginRight: 5 
    },
    galleryImage: { 
        width: 75, 
        height: 75 
    },
    galleryImageMain: { 
        width: 100, 
        height: 100 
    },
    mainGalleryView: {
        width: devDisplayWidth,
        height: devDisplayHeight * 0.8,
        display: 'flex',
        gap: '10px 10px',
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      },
    /* Result page specific styles */
    resultPage: {
        padding: 10,
        gap: 10,
        width: devDisplayWidth,
        height: devDisplayHeight * 0.8,
    },
    resultImage: {
        width: devDisplayWidth * 0.65,
        height: devDisplayHeight * 0.35,
    },
    canvasStyle: {
        width: devDisplayWidth, 
        height: devDisplayHeight * .5, 
        backgroundColor: 'black',
    },
});