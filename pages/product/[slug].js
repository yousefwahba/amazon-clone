import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
const ProductScreen = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  if (!product) {
    return <Layout title="product not found">product not found</Layout>;
  }
  const addToCardHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      alert('there is no more in stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <Layout>
      <div>
        <Link href="/">
          <a>Back to products</a>
        </Link>
      </div>
      {/* grid  */}
      <div className="grid md:grid-cols-4 md:gap-3 ">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.description}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        {/* details  */}
        <div className="mt-2 md:mt-0">
          <p>{product.name}</p>
          <p>Category :{product.category}</p>
          <p>{product.brand}</p>
          <p>
            {product.rating} of {product.numReviews} reviews
          </p>
          <p>{product.description}</p>
        </div>
        {/* card btn  */}
        <div className="card p-5 mt-4 md:h-[9rem] md:mt-0">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCardHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
