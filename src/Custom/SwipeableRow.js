import React, {Component} from 'react';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {translate} from '../Translations/TranslationModel';
import {colors} from '../Model/Model';

/**
 * @class SwipeableRow
 * @description A swipeable row that has a delete as a right action and an edit
 * as a left action.
 * @author Alexander Burdiss
 * @since 1/6/21
 * @version 1.1.0
 * @param {Component} props.children The content to render inside the
 * swipeable.
 * @param {Function} props.delete A function to call when the delete
 * button is pressed
 * @param {Function} props.edit A function to call when the edit button is
 * pressed
 * @param {Object} props.sytles The styles to be applied to the component.
 * @param {Object} props.item The reference to the item, used for dragging and
 * dropping.
 *
 * @component
 * @example
 *   <SwipeableRow
 *     styles={styles}
 *     delete={deleteItem}
 *     item={item}
 *     edit={openEditRoutine}>
 *     {..}
 *   </SwipeableRow>
 */
class SwipeableRow extends Component {
  /**
   * @function SwipeableRow~renderLeftActions
   * @description Renders the left button of the swipeable.
   * @author Alexander Burdiss
   * @since 12/30/20
   * @version 1.0.1
   * @param {Number} progress Passed in from Swipeable
   * @param {Number} dragX Passed in from Swipeable
   */
  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return this.props.edit ? (
      <RectButton
        accessible={true}
        accessibilityLabel={translate('Edit Routine')}
        accessibilityRole="button"
        style={this.props.styles.leftAction}
        onPress={() => this.props.edit(this.props.item)}>
        <Ionicons
          name="pencil"
          size={20}
          style={this.props.styles.pencilIcon}
          color={colors.white}
        />
      </RectButton>
    ) : null;
  };

  /**
   * @function SwipeableRow~renderRightActions
   * @description Renders the right action of the swipeable
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0.0
   * @param {Number} progress Passed in from Swipeable
   * @param {Number} dragX Passed in from Swipeable
   */
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        accessible={true}
        accessibilityLabel={translate('Delete Routine')}
        accessibilityRole="button"
        style={this.props.styles.rightAction}
        onPress={() => this.props.delete(this.props.item)}>
        <Ionicons
          name="trash"
          size={20}
          style={this.props.styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  };

  /**
   * @function SwipeableRow~render
   * @description The Interface for the swipeable row component
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0
   */
  render() {
    const {children} = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={20}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

export default SwipeableRow;
