import React from 'react';
import { Image, StyleSheet } from 'react-native';

type DingdongLogoProps = {
  size?: number;
  rounded?: boolean;
};

export default function DingdongLogo({ size = 48, rounded = true }: DingdongLogoProps) {
  return (
    <Image
      source={require('../../../../../assets/logo.jpg')}
      style={[
        styles.logo,
        {
          width: size,
          height: size,
          borderRadius: rounded ? size / 4 : 0,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.78)',
    backgroundColor: '#FFFFFF',
  },
});
