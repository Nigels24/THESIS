import React, { useState } from "react";
import Close from "../../assets/close.svg";

const Storiesitem = ({ title, desc, imagePath }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="portfolio__item">
      <img src={imagePath} alt="" className="portfolio__img" />

      <div className="portfolio__hover" onClick={toggleModal}>
        <h3 className="portfolio__title">{title}</h3>
      </div>

      {modal && (
        <div className="portfolio__modal">
          <div className="portfolio__modal-content">
            <img
              src={Close}
              alt=""
              className="modal__close"
              onClick={toggleModal}
            />

            <h3 className="modal__title">{title}</h3>

            <ul className="modal__list grid">
              {/* {desc(({ title, desc }, index) => ( */}
              <li className="modal__item">
                <div>
                  {/* <span className="item__title">{title}</span> */}
                  <span className="item__details">{desc}</span>
                </div>
              </li>
              {/* ))} */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Storiesitem;
