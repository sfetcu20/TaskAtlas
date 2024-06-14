import React from 'react';
import Pill from '../Pill';
import { pillColors } from '../../data';
import { classnames } from '../../lib';

const JobCardPill = ({ name }) => {
  const bgColor = pillColors[name].toString();
  return (
    <div className="flex items-center  rounded-full">
      <Pill className={classnames(`${bgColor} text-white`)}>{name}</Pill>
    </div>
  );
};

export default JobCardPill;
