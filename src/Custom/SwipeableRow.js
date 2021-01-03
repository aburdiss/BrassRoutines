import React, {Component} from 'react';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {translate} from '../Translations/TranslationModel';
import {colors} from '../Model/Model';

class SwipeableRow extends Component {
  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return this.props.edit ? (
      <RectButton
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
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={this.props.styles.rightAction}
        onPress={() => this.props.delete(this.props.item)}
        // TODO: Add Accessibility Label and translate
      >
        <Ionicons
          name="trash"
          size={20}
          style={this.props.styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  };

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
