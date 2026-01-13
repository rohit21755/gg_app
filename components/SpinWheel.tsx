import { useAuthStore } from '@/store/authStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Svg, { Circle, Defs, G, Path, Stop, LinearGradient as SvgLinearGradient, Text as SvgText } from 'react-native-svg';
import SpinWheelPrizeModal from './SpinWheelPrizeModal';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.65; // Reduced from 0.85 to 0.65
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2;
const STROKE_WIDTH = 1;
const SEGMENTS = 8;
const HUB_RADIUS = RADIUS * 0.15;

interface Segment {
  label: string;
  gradient: { start: string; middle?: string; end: string };
  value: number;
}

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeModalVisible, setPrizeModalVisible] = useState(false);
  const [prize, setPrize] = useState<any>(null);
  const winningSegmentRef = useRef<Segment | null>(null);
  const rotation = useSharedValue(0);
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const segments: Segment[] = [
    { label: 'Prize 1', gradient: { start: '#FFD700', end: '#FFA500' }, value: 10 },
    { label: 'Prize 2', gradient: { start: '#00FF7F', end: '#32CD32' }, value: 20 },
    { label: 'Prize 3', gradient: { start: '#00CED1', end: '#20B2AA' }, value: 30 },
    { label: 'Prize 4', gradient: { start: '#FF6347', end: '#FF4500' }, value: 40 },
    { label: 'Prize 5', gradient: { start: '#FF1493', end: '#C71585' }, value: 50 },
    { label: 'Prize 6', gradient: { start: '#8B0000', end: '#DC143C' }, value: 60 },
    { label: 'Prize 7', gradient: { start: '#9370DB', end: '#8A2BE2' }, value: 70 },
    { label: 'Prize 8', gradient: { start: '#4B0082', end: '#6A5ACD' }, value: 80 },
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Start animation immediately
    const randomSpins = 5 + Math.random() * 5; // 5-10 full rotations
    const randomAngle = Math.random() * 360; // Random final position
    const totalRotation = rotation.value + (randomSpins * 360) + randomAngle;
    
    // Calculate which segment will win based on final rotation
    // Normalize the angle to 0-360 range
    const normalizedAngle = ((totalRotation % 360) + 360) % 360;
    // The pointer is at the top (0 degrees), so we need to account for that
    // Each segment is 360/8 = 45 degrees
    const segmentAngle = 360 / SEGMENTS;
    // Calculate which segment (0-7) the wheel will land on
    // We add 90 to account for starting position (top is -90 in our calculation)
    const winningSegmentIndex = Math.floor((normalizedAngle + 90) / segmentAngle) % SEGMENTS;
    const calculatedWinningSegment = segments[winningSegmentIndex];
    
    // Store winning segment in ref for use after animation
    winningSegmentRef.current = calculatedWinningSegment;
    
    rotation.value = withTiming(
      totalRotation,
      {
        duration: 4000,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(onSpinEnd)();
        }
      }
    );
  };

  const onSpinEnd = () => {
    setIsSpinning(false);
    
    const winningSegment = winningSegmentRef.current;
    
    // Add XP to user in authStore (no API call - just update local state)
    if (winningSegment) {
      const currentAuth = useAuthStore.getState();
      const currentUser = currentAuth.user;
      
      if (currentUser) {
        const newXP = (currentUser.xp || 0) + winningSegment.value;
        const updatedUser = {
          ...currentUser,
          xp: newXP,
        };
        
        // Update authStore with new XP
        setAuth({
          accessToken: currentAuth.accessToken || '',
          refreshToken: currentAuth.refreshToken || '',
          user: updatedUser,
        });
        
        // Set prize data for modal
        setPrize({
          label: winningSegment.label,
          value: winningSegment.value,
          points: winningSegment.value,
        });
        
        // Show prize modal
        setPrizeModalVisible(true);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Calculate segment paths with rounded edges
  const calculateSegmentPath = (index: number): string => {
    const segmentAngle = 360 / SEGMENTS;
    const startAngle = (index * segmentAngle - 90) * Math.PI / 180; // Start from top
    const endAngle = ((index + 1) * segmentAngle - 90) * Math.PI / 180;
    
    // Inner radius for rounded effect
    const innerRadius = HUB_RADIUS + 5;
    const outerRadius = RADIUS - 2; // Slight margin for rounded edges
    
    // Start point on inner circle
    const x1Inner = CENTER + innerRadius * Math.cos(startAngle);
    const y1Inner = CENTER + innerRadius * Math.sin(startAngle);
    
    // End point on inner circle
    const x2Inner = CENTER + innerRadius * Math.cos(endAngle);
    const y2Inner = CENTER + innerRadius * Math.sin(endAngle);
    
    // Start point on outer circle
    const x1Outer = CENTER + outerRadius * Math.cos(startAngle);
    const y1Outer = CENTER + outerRadius * Math.sin(startAngle);
    
    // End point on outer circle
    const x2Outer = CENTER + outerRadius * Math.cos(endAngle);
    const y2Outer = CENTER + outerRadius * Math.sin(endAngle);
    
    // Create path with rounded outer edge
    return `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 0 0 ${x1Inner} ${y1Inner} Z`;
  };

  // Calculate text position for each segment
  const calculateTextPosition = (index: number): { x: number; y: number; angle: number } => {
    const segmentAngle = 360 / SEGMENTS;
    const midAngle = ((index + 0.5) * segmentAngle - 90) * Math.PI / 180;
    const textRadius = RADIUS * 0.65;
    
    return {
      x: CENTER + textRadius * Math.cos(midAngle),
      y: CENTER + textRadius * Math.sin(midAngle),
      angle: (index + 0.5) * segmentAngle,
    };
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {/* Wheel Container */}
        <View style={styles.wheelContainer}>
          {/* Pointer with light red border */}
          <View style={styles.pointerContainer}>
            <Svg width={30} height={30}>
              <Path
                d="M 15 0 L 0 25 L 30 25 Z"
                fill="transparent"
                stroke="#FF6B6B"
                strokeWidth="2"
              />
            </Svg>
          </View>
          
          {/* The Wheel */}
          <Animated.View style={[styles.wheel, animatedStyle]}>
            <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
              <Defs>
                {/* Define gradients for each segment */}
                {segments.map((segment, index) => {
                  return (
                    <SvgLinearGradient
                      key={`gradient-${index}`}
                      id={`gradient-${index}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <Stop offset="0%" stopColor={segment.gradient.start} stopOpacity="1" />
                      <Stop offset="100%" stopColor={segment.gradient.end} stopOpacity="1" />
                    </SvgLinearGradient>
                  );
                })}
              </Defs>
              
              {/* Dark background circle for wheel base */}
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="#1A1A1A"
                stroke="#0F0F0F"
                strokeWidth={2}
              />
              
              {/* Segments with gradients */}
              {segments.map((segment, index) => {
                const textPos = calculateTextPosition(index);
                return (
                  <G key={index}>
                    <Path
                      d={calculateSegmentPath(index)}
                      fill={`url(#gradient-${index})`}
                      stroke="#0F0F0F"
                      strokeWidth={STROKE_WIDTH}
                    />
                    <SvgText
                      x={textPos.x}
                      y={textPos.y}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
                      opacity={0.9}
                    >
                      {segment.label}
                    </SvgText>
                  </G>
                );
              })}
              
              {/* Center white hub with glow effect */}
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={HUB_RADIUS + 3}
                fill="rgba(255, 255, 255, 0.1)"
              />
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={HUB_RADIUS}
                fill="#FFFFFF"
              />
            </Svg>
          </Animated.View>
        </View>
        
        {/* Spin Button */}
        <TouchableOpacity
          style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
          onPress={spinWheel}
          disabled={isSpinning}
        >
          <LinearGradient
            colors={['#79008C', '#1C519D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.spinButtonGradient}
          >
            <Text style={styles.spinButtonText}>
              {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL!'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        
      </View>
      
      {/* Prize Modal */}
      <SpinWheelPrizeModal
        visible={prizeModalVisible}
        onClose={() => {
          setPrizeModalVisible(false);
          setPrize(null);
        }}
        prize={prize}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  wheelContainer: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  pointerContainer: {
    position: 'absolute',
    top: -18,
    left: WHEEL_SIZE / 2 - 15,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '60deg' }],
  },
  hubContainer: {
    position: 'absolute',
    top: CENTER - HUB_RADIUS,
    left: CENTER - HUB_RADIUS,
    width: HUB_RADIUS * 2,
    height: HUB_RADIUS * 2,
    borderRadius: HUB_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  hubGradient: {
    width: HUB_RADIUS * 1.6,
    height: HUB_RADIUS * 1.6,
    borderRadius: HUB_RADIUS * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  spinButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#79008C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 30,
  },
  spinButtonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButtonDisabled: {
    opacity: 0.5,
  },
  spinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default SpinWheel;
