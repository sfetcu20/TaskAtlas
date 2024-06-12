import { classnames } from '../../lib';
import Option from './Option';

const OptionList = ({
  children,
  getItemProps,
  getMenuProps,
  highlightedIndex,
  isOpen,
  forceUpward,
}) => {
  const showItems = (item, index) => {
    const props = getItemProps({ item, index });
    const isHover = highlightedIndex === index;

    return (
      <Option key={item.value} isHover={isHover} {...props}>
        {item.label}
      </Option>
    );
  };

  return (
    <ul
      className={classnames(
        'overflow-y-auto p-0 outline-none cursor-pointer',
        isOpen && children.length && (forceUpward ? 'dropdown-list-upward' : 'dropdown-list')
      )}
      {...getMenuProps()}
    >
      {isOpen && children.map(showItems)}
    </ul>
  );
};

export default OptionList;
