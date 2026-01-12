import React, { useState } from 'react'
import styles from '../../../styles/SingleProperty.module.css'
const Amenities = ({ items }) => {
  const [showAll, setShowAll] = useState(false);
  const limit = 11;
  const amenities = showAll ? items : items.slice(0, limit);
  const remainingCount = items.length - limit;
  return (
    <>
      {amenities.map((item, i) => (
        <div className="col-md-2 col-4 my-3 d-flex" key={i}>
          <div className="shadow-sm p-2 width-full">
            <p className={`${item.icons} ${styles.amIcon}`}></p>
            <p className="text-center">{item.title}</p>
          </div>
        </div>
      ))}

      {!showAll && remainingCount > 0 && (
        <div
          className="col-2 my-3 d-flex flex-column align-items-center justify-content-center cursor-pointer"
          onClick={() => setShowAll(true)}
          style={{
            border: "1px dashed #ccc",
            borderRadius: "8px",
            maxHeight: "75px",
            cursor: "pointer",
          }}
        >
          <span className="fw-bold">+{remainingCount}</span>
          <small>More</small>
        </div>
      )}

      {showAll && items.length > limit && (
        <div className="col-12 text-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </div>
      )}
    </>
  )
}

export default Amenities
