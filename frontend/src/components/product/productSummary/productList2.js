import React, { Component } from 'react';
import axios from 'axios';

class ProductList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/products2')
      .then(response => {
        this.setState({
          products: response.data,
          loading: false,
          error: null
        });
        console.log(response.data)
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: 'Error fetching data'
        });
      });
  }

  render() {
    const { products, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    // Group products by name and sum up quantities, prices, dozens, and cartons
    const groupedProducts = products.reduce((acc, product) => {
      const existingProduct = acc.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.price += product.price;
        existingProduct.dozen += product.dozen;
        existingProduct.carton += product.carton;
      } else {
        acc.push({ ...product });
      }
      return acc;
    }, []);

    return (
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Product List</h1>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%', textAlign: 'center', fontSize: '14px', color:'black' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Name</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>SKU</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Cartons</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Quantity</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Price</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Dozens</th>
            </tr>
          </thead>
          <tbody>
            {groupedProducts.map(product => (
              <tr key={product._id} style={{ backgroundColor: '#fff' }}>
                <td style={{ border: '1px solid black', padding: '10px', color: '#333' }}>{product.name}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{product.sku}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{product.carton}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{product.quantity}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{product.price}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{product.dozen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList2;
