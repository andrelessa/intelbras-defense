import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { CustomSizesProps, IconProps } from './types';

export const ImageIcon: FC<IconProps> = (props) => {
  const { customSize, ...rest } = props;

  const customSizes: CustomSizesProps = {
    width: customSize,
    height: customSize,
    fontSize: customSize,
  };

  return <FontAwesomeIcon {...rest} {...customSizes} icon={faImage} />;
};
