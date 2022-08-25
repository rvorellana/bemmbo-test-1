import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ConfirmModal from "./confirmModal";

const Invoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [pendingInvoices, setPendingInvoices] = useState(null);
  const [creditNotes, setCreditNotes] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [asign, setAsign] = useState(null);

  const mockInvoices = useCallback(
    [
      {
        id: "inv_MRlj0lt95XyQjvPY",
        amount: 40000000,
        organization_id: "piedpiper",
        currency: "CLP",
        type: "received",
      },
      {
        id: "inv_KedI7Yt22XM64129",
        amount: 16000,
        currency: "USD",
        organization_id: "piedpiper",
        type: "received",
      },
      {
        id: "inv_QerT7Yt22XM64MN3",
        amount: 4000000,
        currency: "CLP",
        organization_id: "piedpiper",
        type: "credit_note",
        reference: "inv_KedI7Yt22XM64129",
      },
      {
        id: "inv_012mGPt6Vb2w49GR",
        amount: 800,
        currency: "USD",
        organization_id: "piedpiper",
        type: "credit_note",
        reference: "inv_KedI7Yt22XM64129",
      },
      {
        id: "inv_nDAprkt7D0LKjkE2",
        amount: 80000,
        currency: "USD",
        organization_id: "octopus",
        type: "received",
      },
      {
        id: "inv_JitErYt22XM64MN3",
        amount: 40000,
        currency: "CLP",
        organization_id: "octopus",
        type: "credit_note",
        reference: "inv_nDAprkt7D0LKjkE2",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await axios.get(
        "https://recruiting.api.bemmbo.com/invoices/pending"
      );
      setPendingInvoices(response.data.filter((i) => i.type === "received"));
    };
    fetchInvoices().catch((err) => {
      console.log(err);
      setPendingInvoices(mockInvoices.filter((i) => i.type === "received"));
      console.log("Using mock data");
    });
  }, [mockInvoices]);

  useEffect(() => {
    if (selectedInvoice) {
      const fetchInvoices = async () => {
        const response = await axios.get(
          "https://recruiting.api.bemmbo.com/invoices/pending"
        );
        setPendingInvoices(
          response.data.filter(
            (i) =>
              i.type === "credit_note" && i.reference === selectedInvoice.id
          )
        );
      };
      fetchInvoices().catch((err) => {
        console.log(err);
        setCreditNotes(
          mockInvoices.filter(
            (i) =>
              i.type === "credit_note" && i.reference === selectedInvoice.id
          )
        );
        console.log("Using mock data");
      });
    }
  }, [selectedInvoice, mockInvoices]);

  return (
    <div className="mx-auto">
      <div className="  mx-72 text-center">
        <h1 className="text-xl font-bold my-4">Seleccionar una factura</h1>
        <ul className="text-sm font-medium  bg-white rounded-lg border border-gray-200">
          {pendingInvoices &&
            pendingInvoices.map((invoice) => (
              <div key={invoice.id} className="w-full">
                <li className="rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  <div
                    className={
                      selectedInvoice && selectedInvoice.id === invoice.id
                        ? "flex items-center pl-3 w-full bg-blue-100"
                        : "flex items-center pl-3 w-full "
                    }
                  >
                    <input
                      id="list-radio-license"
                      type="radio"
                      value={invoice.id}
                      name="list-radio"
                      onChange={() => {
                        setSelectedInvoice(invoice);
                        setSelectedCreditNote(null);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50"
                    />
                    <label
                      for="list-radio-license"
                      className={
                        selectedInvoice && selectedInvoice.id === invoice.id
                          ? "py-3 ml-2 text-sm font-medium text-purple-900 bg-blue-100 w-full"
                          : "py-3 ml-2 text-sm font-medium text-gray-900 w-full"
                      }
                    >
                      <div className="grid w-full grid-cols-3">
                        <div>
                          {invoice.id}
                          <span className="font-thin">
                            ({invoice.organization_id})
                          </span>
                        </div>
                        <div>
                          ${invoice.amount} {invoice.currency}
                        </div>
                        <span className="font-thin">{invoice.type}</span>
                      </div>
                    </label>
                  </div>
                </li>
              </div>
            ))}
        </ul>
        {selectedInvoice && creditNotes && creditNotes.length > 0 ? (
          <h1 className="text-xl font-bold my-4">
            Seleccionar una nota de crédito
          </h1>
        ) : null}

        <ul className="text-sm font-medium  bg-white rounded-lg border border-gray-200">
          {pendingInvoices &&
            selectedInvoice &&
            creditNotes &&
            creditNotes.map((invoice) => (
              <div key={invoice.id} className="w-full">
                <li className="rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  <div
                    className={
                      selectedCreditNote && selectedCreditNote.id === invoice.id
                        ? "flex items-center pl-3 w-full bg-blue-100"
                        : "flex items-center pl-3 w-full "
                    }
                  >
                    <input
                      id="credit"
                      type="radio"
                      value={invoice}
                      name="credit"
                      onChange={() => setSelectedCreditNote(invoice)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50 focus:bg-blue-900"
                    />
                    <label
                      for="list-radio-license"
                      className={
                        selectedCreditNote &&
                        selectedCreditNote.id === invoice.id
                          ? "py-3 ml-2 text-sm font-medium text-purple-900 bg-blue-100 w-full"
                          : "py-3 ml-2 text-sm font-medium text-gray-900 w-full"
                      }
                    >
                      <div className="grid w-full grid-cols-3">
                        <div>
                          {invoice.id}
                          <span className="font-thin">
                            ({invoice.organization_id})
                          </span>
                        </div>
                        <div>
                          ${invoice.amount} {invoice.currency}
                        </div>
                        <span className="font-thin">{invoice.rerference}</span>
                      </div>
                    </label>
                  </div>
                </li>
              </div>
            ))}
        </ul>
        {selectedInvoice && selectedCreditNote ? (
          <button
            onClick={() => setAsign(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-4"
          >
            Asignar
          </button>
        ) : null}
      </div>
      {selectedInvoice && selectedCreditNote && asign === true ? (
        <ConfirmModal
          setSelectedCreditNote={setSelectedCreditNote}
          setSelectedInvoice={setSelectedInvoice}
          setAsign={setAsign}
        />
      ) : null}
    </div>
  );
};

export default Invoices;
