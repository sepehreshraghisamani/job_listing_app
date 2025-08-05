import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const override = {
    display: "block",
    margin: "100px auto",
    borderColor: "blue",
    };


const Spinner = ({loading}) => {
  return (
    <>
        <HashLoader
            color="#36d7b7"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </>
  )
}

export default Spinner