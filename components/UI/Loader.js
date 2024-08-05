import React from 'react'
import Image from 'next/image'
import LoaderGif from '../../assets/images/Loader.svg'
export default function Loader() {
  return (
    <div>
        <Image src={LoaderGif} alt="loader" width={50} height={50} />
    </div>
  )
}
