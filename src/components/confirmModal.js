import React from "react";

const ConfirmModal = ({
  setSelectedInvoice,
  setSelectedCreditNote,
  setAsign,
}) => {
  return (
    <div>
      <div
        id="popup-modal"
        tabindex="-1"
        className=" inset-0 overflow-y-hidden overflow-x-hidden fixed translate-x-1/3 translate-y-1/3 z-50 "
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="p-6 text-center">
              <svg
                className="w-12 h-12 mb-4 stroke-green-500 mx-auto "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <path
                  class="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-black-500 ">
                Nota de crédito asignada correctamente
              </h3>
              <button
                onClick={() => {
                  setSelectedInvoice(null);
                  setSelectedCreditNote(null);
                  setAsign(false);
                }}
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Seguir asignando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
