import React from 'react'

export const Error = (error: Error) => {
  return (
    <div>
      {error.message}
    </div>
  )
}
