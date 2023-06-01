import React, { useEffect, useState } from "react";

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/problem-2/modalA") {
      setModalAOpen(true);
      setCurrentModal("Modal A");
      fetchContacts("https://contact.mediusware.com/api/contacts/");
    } else if (path === "/problem-2/modalB") {
      setModalBOpen(true);
      setCurrentModal("Modal B");
      fetchContacts(
        "https://contact.mediusware.com/api/country-contacts/United States/"
      );
    } else {
      setModalAOpen(false);
      setModalBOpen(false);
      setModalCOpen(false);
      setCurrentModal("");
    }
  }, []);

  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
    setModalCOpen(false);
    setCurrentModal("Modal A");
    window.history.pushState(null, "", "/problem-2/modalA");
    fetchContacts("https://contact.mediusware.com/api/contacts/");
  };

  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);
    setCurrentModal("Modal B");
    window.history.pushState(null, "", "/problem-2/modalB");
    fetchContacts(
      "https://contact.mediusware.com/api/country-contacts/United%20States/"
    );
  };

  const closeModal = () => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(false);
    setCurrentModal("");
    window.history.pushState(null, "", "/problem-2/");
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setModalCOpen(true);
  };

  const fetchContacts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setContacts(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {modalAOpen && (
        <ModalA
          closeModal={closeModal}
          currentModal="Modal A"
          openModalA={openModalA}
          openModalB={openModalB}
          contacts={contacts}
          handleContactClick={handleContactClick}
        />
      )}

      {modalBOpen && (
        <ModalB
          closeModal={closeModal}
          currentModal="Modal B"
          openModalA={openModalA}
          openModalB={openModalB}
          contacts={contacts}
          handleContactClick={handleContactClick}
        />
      )}

      {modalCOpen && (
        <ModalC
          closeModal={() => setModalCOpen(false)}
          currentModal="Modal C"
          selectedContact={selectedContact}
        />
      )}
    </div>
  );
};

const ModalA = ({
  closeModal,
  currentModal,
  openModalA,
  openModalB,
  contacts,
  handleContactClick,
}) => {
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleCheckboxChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
  };

  useEffect(() => {
    setFilteredContacts(
      onlyEvenChecked
        ? contacts.filter((contact) => contact.id % 2 === 0)
        : contacts
    );
  }, [contacts, onlyEvenChecked]);

  return (
    <div className="modal" style={{ display: "block", zIndex: "100" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentModal}</h5>

            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={onlyEvenChecked}
                onChange={handleCheckboxChange}
              />
              Only even
            </label>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="modal-body">
            {/* Modal A content */}
            {filteredContacts.map((contact) => (
              <div key={contact.id} onClick={() => handleContactClick(contact)}>
                <p>
                  <span>ID: {contact.id} </span>{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone:{" "}
                  {contact.phone}
                </p>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={openModalA}>
              All Contacts
            </button>
            <button className="btn btn-warning" onClick={openModalB}>
              US Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalB = ({
  closeModal,
  currentModal,
  openModalA,
  openModalB,
  contacts,
  handleContactClick,
}) => {
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleCheckboxChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
  };

  useEffect(() => {
    setFilteredContacts(
      onlyEvenChecked
        ? contacts.filter((contact) => contact.id % 2 === 0)
        : contacts
    );
  }, [contacts, onlyEvenChecked]);

  return (
    <div className="modal" style={{ display: "block", zIndex: "100" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentModal}</h5>

            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={onlyEvenChecked}
                onChange={handleCheckboxChange}
              />
              Only even
            </label>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="modal-body">
            {/* Modal B content */}
            {filteredContacts.map((contact) => (
              <div key={contact.id} onClick={() => handleContactClick(contact)}>
                <p>
                  <span>ID: {contact.id} </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone:{" "}
                  {contact.phone}
                </p>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            {" "}
            <button className="btn btn-primary" onClick={openModalA}>
              All Contacts
            </button>
            <button className="btn btn-warning" onClick={openModalB}>
              US Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalC = ({ closeModal, currentModal, selectedContact }) => {
  return (
    <div className="modal" style={{ display: "block", zIndex: "200" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentModal}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            {/* Modal C content */}
            {selectedContact && (
              <div>
                <p>ID: {selectedContact.id}</p>
                <p>Phone: {selectedContact.phone}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
