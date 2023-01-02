import { useCallback, useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

interface StarProps {
  index: number;
  isHighlighted: boolean;
  onClick: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const Star: React.FC<StarProps> = ({
  index,
  isHighlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const onLocalMouseEnter = useCallback(() => {
    onMouseEnter(index);
  }, [onMouseEnter]);

  const onLocalMouseLeave = useCallback(() => {
    onMouseLeave();
  }, [onMouseLeave]);

  const onLocalClick = useCallback(() => {
    onClick(index);
  }, [onClick]);

  return (
    <svg
      className={'star'}
      onClick={onLocalClick}
      onMouseEnter={onLocalMouseEnter}
      onMouseLeave={onLocalMouseLeave}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={isHighlighted ? 'yellow' : undefined}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};

function App() {
  const [selected, setSelected] = useState(-1);
  const [highlighted, setHighlighted] = useState(-1);
  const [open, setOpen] = useState(false);

  const onClick = useCallback((index: number) => {
    setSelected(index);
    setOpen(true);
  }, []);

  const onBlur = useCallback(() => {
    setOpen(false);
  }, []);

  const resetHighlighted = useCallback(() => {
    setHighlighted(-1);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="bruh" onBlur={onBlur}>
      <div>
        {Array(5)
          .fill('1')
          .map((_, index) => (
            <Star
              key={index}
              index={index}
              onClick={onClick}
              onMouseEnter={setHighlighted}
              onMouseLeave={resetHighlighted}
              isHighlighted={
                index <= (highlighted !== -1 ? highlighted : selected)
              }
            />
          ))}
      </div>
      {open && <input ref={inputRef}></input>}
    </div>
  );
}

export default App;
