import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { COLORS } from '../theme';

export const GlassPanel: React.FC<ViewProps> = ({style, children, ...rest}) => (
  <View style={[styles.glass, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  glass: {
    backgroundColor: COLORS.glassBg,
    borderRadius: 12,
    padding: 12,
    // expo-blur can be added for true backdrop blur on native
    // For simplicity we use semi‑transparent background
    // shadow for depth
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
