import {useState, useImperativeHandle, forwardRef} from 'react';
import './Menu.css'

type MenuItem = {
  id: number;
  label: string;
};

const mainMenuItems: MenuItem[] = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
];

interface MenuProps {
  scrollDirection: string | undefined;
}

export type MenuHandle = {
  updateIndex: (message: string) => void;
};

const Menu = forwardRef<MenuHandle, MenuProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (message: string) => {
    setSelectedIndex((prev) => {
      if (message === 'counterclockwise') {
        return prev > 0 ? prev - 1 : 0; 
      } else if (message === 'clockwise') {
        return prev < mainMenuItems.length - 1 ? prev + 1 : mainMenuItems.length - 1;
      }
      return prev;
    });
  };

  useImperativeHandle(ref, () => ({
    updateIndex,
  }));

  return (
    <div className='menu'>
      <div className='title'>
        {mainMenuItems[selectedIndex].label}
      </div>
      
      <div className="menu-items">
        {mainMenuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${index === selectedIndex ? 'selected' : ''}`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Menu;