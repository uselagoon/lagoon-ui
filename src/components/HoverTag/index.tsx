import { FC } from 'react';

import { Tag, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

import { TooltipText } from './styles';

interface Props {
  text: string;
  formatToReadableText?: boolean;
  tooltipPosition?: TooltipPlacement;
  tagColor?: string;
  maxWidth?: string;
  textColor?: string;
}

// human friendly strings
const textPairs = {
  deployCompletedWithWarnings: 'Completed with warnings',
};

const HoverTag: FC<Props> = ({ tooltipPosition, tagColor, maxWidth, text, textColor, formatToReadableText }) => {
  const toolTipTextProps = {
    ...(maxWidth ? { $maxWidth: maxWidth } : {}),
    ...(textColor ? { $textColor: textColor } : {}),
  };

  const formatText = (textProp: Props['text']) => {
    return (textPairs[textProp] as string | undefined) || text;
  };

  const textContent = formatToReadableText ? formatText(text) : text;

  return (
    <Tag color={tagColor || '#108ee9'}>
      {
        <Tooltip placement={tooltipPosition || 'right'} title={textContent}>
          <TooltipText {...toolTipTextProps}>{textContent}</TooltipText>
        </Tooltip>
      }
    </Tag>
  );
};

export default HoverTag;
