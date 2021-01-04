import React from 'react';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useDarkMode} from 'react-native-dynamic';
import {colors} from '../Model/Model';

/**
 * @description A modal that allows the user to zoom in on the image. Fades in
 * and out, and can be cancelled by swiping down, or tapping.
 * @author Alexander Burdiss
 * @since 1/2/21
 */
const ZoomModal = ({imagePath, zoomModalIsShowing, setZoomModalIsShowing}) => {
  const DARKMODE = useDarkMode();
  return (
    <Modal
      coverScreen={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{margin: 0}}
      isVisible={zoomModalIsShowing}>
      <ImageViewer
        backgroundColor={DARKMODE ? colors.orangeDark : colors.orangeLight}
        imageUrls={[
          {
            url: '',
            props: {
              source: imagePath,
            },
          },
        ]}
        renderIndicator={() => null}
        onSwipeDown={() => setZoomModalIsShowing(false)}
        onClick={() => setZoomModalIsShowing(false)}
        enableSwipeDown={true}
      />
    </Modal>
  );
};

export default ZoomModal;