import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ClothInfo() {
  const URL = 'https://dummyjson.com/products';
  const [data, setData] = useState(null);
  const { id: pageId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  let image = null;
  for (let i = 0; i < data?.products.length; i++) {
    if (data?.products[i].id == pageId) {
      // console.log(data?.products[i]);
      image = data?.products[i];
      console.log(image);
    }
  }

  return (
    <div>
      <img src={image?.images} alt={image?.description} />
    </div>
  );
}

export default ClothInfo;
