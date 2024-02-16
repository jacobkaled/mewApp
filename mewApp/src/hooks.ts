import { useEffect, useState } from "react";

export const useScrollDown = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  isFetching: boolean
) => {
  useEffect(() => {
    if (ref && ref.current && !isFetching) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isFetching, ref]);
};

type TuseModal = {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
};
export const useModal = (): TuseModal => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return { isOpen, handleCloseModal, handleOpenModal };
};
