import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

function AccumulativeGraph({ data }) {
  // 데이터의 총합 계산
  const totalScore = Object.values(data).reduce((total, score) => total + score, 0);

  // 데이터를 누적 백분율로 변환
  let accumulatedPercentage = 0;
  const accumulatedData = Object.keys(data).map((style) => {
    const score = data[style];
    const percentage = (score / totalScore) * 100;
    accumulatedPercentage += percentage;
    return { style, percentage: accumulatedPercentage };
  });

  // 그래프를 그리는 함수
  const drawGraph = () => {
    let startPointX = 0;
    let startPointY = 100;
    let path = '';

    // 각 데이터 포인트를 이용하여 패스 생성
    accumulatedData.forEach((point) => {
      const { style, percentage } = point;
      const endPointX = percentage;
      const endPointY = 100;

      // 패스에 현재 데이터 포인트를 추가
      path += `M ${startPointX} ${startPointY} L ${endPointX} ${endPointY} `;

      // 다음 데이터 포인트를 위해 시작점 업데이트
      startPointX = endPointX;
      startPointY = endPointY;
    });

    return path;
  };

  return (
    <View>
      <Svg height="100" width="100%" viewBox="0 0 100 100">
        <Path d={drawGraph()} fill="none" stroke="blue" strokeWidth="2" />
      </Svg>
    </View>
  );
}

export default AccumulativeGraph;