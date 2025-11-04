 'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const router = useRouter()
    const cardRef = useRef(null)
    const [isAnimating, setIsAnimating] = useState(false)

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length || 0);

    const handleClick = (e) => {
        // play a short opening animation then navigate to the product page
        if (isAnimating) return
        setIsAnimating(true)
        if (cardRef.current) cardRef.current.classList.add('animate-open')
        // small delay so animation is visible before navigation
        setTimeout(() => {
            router.push(`/product/${product.id}`)
        }, 300)
    }

    return (
        <div
            role="link"
            tabIndex={0}
            ref={cardRef}
            onClick={handleClick}
            onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
            className={`product-card group max-xl:mx-auto cursor-pointer w-full sm:w-auto`}
        >
            <div className='bg-transparent h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='product-image max-h-30 sm:max-h-40 w-auto transition-transform duration-400' src={product.images[0]} alt={product.name || 'product image'} />
            </div>
            <div className='flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60 product-meta'>
                <div>
                    <p className='truncate'>{product.name}</p>
                    <div className='flex'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? "#B59A7D" : "#D1D5DB"} />
                        ))}
                    </div>
                </div>
                <p className='price'>{currency}{product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard