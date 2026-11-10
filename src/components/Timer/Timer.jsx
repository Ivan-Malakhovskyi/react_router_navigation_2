import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { TimerModal } from "./TimerModal";

export const Timer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="d-flex my-5">
      <button type="button" className="btn btn-primary my-5" onClick={toggle}>
        Open timer
      </button>

      {isOpen && (
        <Modal onModalClose={toggle}>
          <TimerModal />
        </Modal>
      )}
    </div>
  );
};
