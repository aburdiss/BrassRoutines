import React from 'react';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useDarkMode } from '../../utils';
import { colors } from '../../Model/Model';
import { StyleSheet } from 'react-native';

/**
 * @function ZoomModal
 * @component
 * @description A modal that allows the user to zoom in on the image. Fades in
 * and out, and can be cancelled by swiping down, or tapping.
 * Created 1/2/21
 * @param {Object} props JSX props passed to this React Component
 * @param {Object} props.imagePath The path to the image. The return value from
 * the require() function.
 * @param {boolean} props.zoomModalIsShowing A state variable on whether or not
 * to render this component.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.1
 *
 * @example
 * <ZoomModal
 *   imagePath={imagePath}
 *   zoomModalIsShowing={zoomModalIsShowing}
 *   setZoomModalIsShowing={setZoomModalIsShowing}
 * />
 */
export default function ZoomModal({
  imagePath,
  zoomModalIsShowing,
  setZoomModalIsShowing,
}) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    modal: {
      margin: 0,
    },
  });

  return (
    <Modal
      coverScreen={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.modal}
      isVisible={zoomModalIsShowing}
    >
      <ImageViewer
        backgroundColor={DARKMODE ? colors.black : colors.white}
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
}
