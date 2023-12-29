import React from 'react';
import { ConfigProvider, Slider } from 'antd';
import { RangeInputProps } from './type';

import styles from './index.module.scss';

const customSliderTheme = {
  components: {
    Slider: {
      controlSize: 4,
      dotSize: 4,
      handleLineWidth: 1,
      handleLineWidthHover: 2,
      handleSize: 10,
      handleSizeHover: 10,
      railSize: 2,
      railBg: '#000000',
      railHoverBg: '#000000',
      dotActiveBorderColor: '#000000',
      dotBorderColor: '#000000',
      handleActiveColor: '#000000',
      handleColor: '#000000',
      trackHoverBg: '#000000',
      trackBg: '#000000',
    },
  },
};

const RangeInput: React.FC<RangeInputProps> = ({ min, max, onChange }) => {
  return (
    <ConfigProvider theme={customSliderTheme}>
      <div className={styles.mainContainer}>
        <p>PRICE</p>
        <Slider range defaultValue={[min, max]} value={[min, max]} min={0} max={1000} onChange={onChange}/>
        <div className={styles.rangeContainer}>
          <p>${min}</p>
          <p>${max} </p>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default RangeInput;
