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
    /* Details page specific styles */
    midText: {
        fontSize: 16,
    },
    fullWideImg: {
        width: devDisplayWidth,
        height: devDisplayWidth * 0.7,
    },

    bigText: {
        fontSize: 22,
    },
    pickerStyle: {
        width: devDisplayWidth * 0.8,
        // height: 30,
        fontSize: 8,
    },
    
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#f4511e',
      },
      buttonCTA: { // call to action button
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 36,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#f4511e',
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      buttonTextCTA: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});