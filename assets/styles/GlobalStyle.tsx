import { StyleSheet } from "react-native";
export const GlobalStyle = StyleSheet.create({
      textHeading: {
    fontFamily: 'AnekOdia-ExtraBold',
    fontWeight: '800',
    fontSize: 36,
    lineHeight: 32,
    letterSpacing: -0.72,
    textAlign: 'center',
    color: '#F9F9F9',

  },
    textRegular: {
    fontFamily: 'AnekOdia-Regular', 
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16, // 100% of fontSize
    letterSpacing: 0.08, // -2% of 16px = -0.32
    textAlign: 'center',
    color: "#BFBFBF"
  }
});