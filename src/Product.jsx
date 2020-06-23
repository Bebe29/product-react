import React from "react";
import { Component } from "react";
import Axios from "axios";
import "./Product.css";

const API_URL = `http://localhost:8080`;

class Product extends Component {
  state = {
    product: {
      name: "",
      price: "",
      image: "",
    },
    editProduct: {
      id: 0,
      name: "",
      price: "",
      image: "",
    },
    productData: [],
    editIdx: [],
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({ productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  inputHandler = (event, field, key) => {
    const { value } = event.target;
    this.setState({
      [field]: {
        ...this.state[field],
        [key]: value,
      },
    });
  };

  addProductHandler = () => {
    Axios.post(`${API_URL}/products`, {
      name: this.state.product.name,
      price: this.state.product.price,
      image: this.state.product.image,
    })
      .then((res) => {
        this.getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderProduct = () => {
    return this.state.productData.map((val, idx) => {
      const { id, name, price, image } = val;
      console.log(this.state.editProduct);
      return (
        <>
          {idx === this.state.editIdx ? (
            <tr>
              <td>{id}</td>
              <td>
                <input
                  type="text"
                  onChange={(e) => this.inputHandler(e, "editProduct", "name")}
                  value={this.state.editProduct.name}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => this.inputHandler(e, "editProduct", "price")}
                  value={this.state.editProduct.price}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => this.inputHandler(e, "editProduct", "image")}
                  value={this.state.editProduct.image}
                />
              </td>
              <td>
                <input
                  type="button"
                  value="Save"
                  onClick={(_) => this.updateHandler(id)}
                />
              </td>
            </tr>
          ) : (
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{price}</td>
              <td>
                <img src={image} alt="" className="image" />
              </td>
              <td>
                <input
                  type="button"
                  value="Edit"
                  onClick={(_) => this.editHandler(idx)}
                />
                <input
                  type="button"
                  value="Delete"
                  onClick={(_) => this.deleteHandler(id)}
                />
              </td>
            </tr>
          )}
        </>
      );
    });
  };

  editHandler = (idx) => {
    this.setState({
      editProduct: { ...this.state.productData[idx] },
      editIdx: idx,
    });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/products/${id}`)
      .then((res) => {
        this.getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateHandler = (id) => {
    Axios.put(`${API_URL}/products/${id}`, {
      id,
      name: this.state.editProduct.name,
      price: this.state.editProduct.price,
      image: this.state.editProduct.image,
    })
      .then((res) => {
        this.setState({ editIdx: [] });
        this.getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Product</h1>
        <div>
          <h5>Name</h5>
          <input
            type="text"
            onChange={(e) => this.inputHandler(e, "product", "name")}
            value={this.state.product.name}
          />
          <h5>Price</h5>
          <input
            type="text"
            onChange={(e) => this.inputHandler(e, "product", "price")}
            value={this.state.product.price}
          />
          <h5>Image</h5>
          <input
            type="text"
            onChange={(e) => this.inputHandler(e, "product", "image")}
            value={this.state.product.pimage}
          />
        </div>
        <br />
        <input
          type="button"
          value="Add Product"
          onClick={this.addProductHandler}
        />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Product Name</td>
              <td>Price</td>
              <td>Image</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{this.renderProduct()}</tbody>
        </table>
      </div>
    );
  }
}

export default Product;
