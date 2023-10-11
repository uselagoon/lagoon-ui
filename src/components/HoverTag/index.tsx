import { FC } from 'react';

import { Tag, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

import { TooltipText } from './styles';

interface Props {
  text: string;
  tooltipPosition?: TooltipPlacement;
  tagColor?: string;
  maxWidth?: string;
}
const HoverTag: FC<Props> = ({ tooltipPosition, tagColor, maxWidth, text }) => {
  return (
    <Tag color={tagColor || '#108ee9'}>
      {
        <Tooltip placement={tooltipPosition || 'right'} title={text}>
          <TooltipText maxWidth={maxWidth}>{text}</TooltipText>
        </Tooltip>
      }
    </Tag>
  );
};

export default HoverTag;
