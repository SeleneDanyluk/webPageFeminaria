import { useState, useCallback } from 'react';

const useModal = () => {
  const [isShown, setIsShown] = useState(false);

  const showModal = useCallback(() => {
    setIsShown(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsShown(false);
  }, []);

  return {
    isShown,
    showModal,
    hideModal
  };
};

export default useModal;