import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Bestseller(props) {
  const URL = 'https://dummyjson.com/products';

  const [data, setData] = useState([]);

  useEffect(() => {
    async function dataFetching() {
      const response = fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          const finData = data.products;
          setData(finData);
          // setData(data)
          console.log(finData);
        });
    }

    dataFetching();
  }, []);
  return (
    <>
      <h2>Our bestsellers</h2>
      <div className="bestseller">
        {data.map((x) => {
          return <Link to={`/clothinfo/${x.id}`}>{x ? <img src={x.images[0]} alt="" /> : ''}</Link>;
        })}
      </div>
    </>
  );
}
export default Bestseller;
