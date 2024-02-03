import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons/faSpinnerThird';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
import Text from './Text';

export default function Loading({ className, ...props }) {
  return (
    <div className={clsx(className, 'flex justify-center items-center')} {...props}>
      <Text as="span" opacity={30}>
        <Icon icon={faSpinnerThird} className="animate-spin" size="2x" />
      </Text>
    </div>
  );
}

Loading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
