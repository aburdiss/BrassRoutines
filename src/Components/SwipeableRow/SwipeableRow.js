import React from 'react';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { translate } from '../../Translations/TranslationModel';
import { colors } from '../../Model/Model';

/**
 * @function SwipeableRow
 * @component
 * @description A swipeable row that has a delete as a right action and an edit
 * as a left action.
 * Created 1/6/21
 * @param {Object} props JSX props passed to this React Component
 * @param {string|JSX.Element} props.children The content to render inside the
 * swipeable.
 * @param {Function} props.deleteElement A function to call when the delete
 * button is pressed
 * @param {Function} props.edit A function to call when the edit button is
 * pressed
 * @param {Object} props.sytles The styles to be applied to the component.
 * @param {Object} props.item The reference to the item, used for dragging and
 * dropping.
 * @returns {JSX.Element} JSX render instructions
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 2.0.0
 *
 * @example
 * <SwipeableRow
 *   styles={styles}
 *   delete={deleteItem}
 *   item={item}
 *   edit={openEditRoutine}>
 * </SwipeableRow>
 */
export default function SwipeableRow({
  children,
  deleteElement,
  edit,
  styles,
  item,
}) {
  /**
   * @function SwipeableRow~renderLeftActions
   * @description Renders the left button of the swipeable.
   * @author Alexander Burdiss
   * @since 12/30/20
   * @version 1.0.1
   * @param {Number} progress Passed in from Swipeable
   * @param {Number} dragX Passed in from Swipeable
   */
  function renderLeftActions(progress, dragX) {
    return edit ? (
      <RectButton
        accessible={true}
        accessibilityLabel={translate('Edit Routine')}
        accessibilityRole="button"
        style={styles.leftAction}
        onPress={() => edit(item)}
      >
        <Ionicons
          name="pencil"
          size={20}
          style={styles.pencilIcon}
          color={colors.white}
        />
      </RectButton>
    ) : null;
  }

  /**
   * @function SwipeableRow~renderRightActions
   * @description Renders the right action of the swipeable
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0.0
   * @param {Number} progress Passed in from Swipeable
   * @param {Number} dragX Passed in from Swipeable
   */
  function renderRightActions(progress, dragX) {
    return (
      <RectButton
        accessible={true}
        accessibilityLabel={translate('Delete Routine')}
        accessibilityRole="button"
        style={styles.rightAction}
        onPress={() => deleteElement(item)}
      >
        <Ionicons
          name="trash"
          size={20}
          style={styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  }

  return (
    <Swipeable
      friction={2}
      leftThreshold={80}
      rightThreshold={20}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
}
