"use client"

function Spinner() {
    return (
        <div className='loadingSpinnerContainer'>
            <div className='loadingSpinner'></div>
        </div>
    )
}

export default Spinner
// import styled, { keyframes } from 'styled-components'


// const spin = keyframes`
//     0% {
//         transform: rotate(0deg);
//     }
//     100% {
//         transform: rotate(360deg);
//     }
// `

// export const Spinner = styled.div`
//   border: 0.3em solid rgba(0, 0, 0, 0.1);
//   border-top: 0.3em solid #80C33F;
//   border-radius: 50%;
//   width: 4rem;
//   height: 4rem;
//   animation: ${spin} 1s linear infinite;
// `

// export default Spinner