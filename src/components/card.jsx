import { useLocation } from 'react-router-dom'
import AddToCart from './addToCart'
import './card.css'
export const Card = ({ data }) => {

  const location=useLocation().pathname
  return (
    <div className="card-container bg-white">
      {data.map((item, index) => (
        <div className="product-card bg-white" key={index}>
          <figure>
            <img src={item.images[0]} alt="Product Image" className="product-image bg-white" />
            {/* <img src={item.thumbnail} alt="Product Image" className="product-image bg-white" /> */}
          </figure>

{
  location==='/'? <>
  </>:
  <>
          <div className="product-description">
            <div className="product-info ">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
            <div className="price">${item.price}</div>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < 4* !item.rating ? 'filled-star' : 'empty-star'}>★</span>
              ))}
              {/* {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < item.rating ? 'filled-star' : 'empty-star'}>★</span>
              ))} */}
            </div>
          </div>
            <AddToCart 
              product={item}
              showQty={true}
              redirect={false}
              increasePerClick={true}
              />
              </>
      }

        </div>
      ))}
    </div>
  )
}

