import React from "react";
import ReactDOM from "react-dom";

function Confirmation({ onConfirm, onDecline }) {
  const ui = (
    <div className="confirmation">
      <div className="confirmation__overlay"></div>
      <div className="confirmation__modal">
        <div className="confirmation__header">
          <div className="confirmation__header-text">Are you Sure?</div>
        </div>
        <div className="confirmation__header-buttons">
          <button
            className="confirmation__header-buttons-yes"
            onClick={() => onConfirm()}
          >
            yes
          </button>
          <button
            className="confirmation__header-buttons-no"
            onClick={() => onDecline()}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );

  const container = document.querySelector("body");
  return ReactDOM.createPortal(ui, container);
}

export default Confirmation;
