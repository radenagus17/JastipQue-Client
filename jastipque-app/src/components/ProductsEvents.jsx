import { Link } from "react-router-dom";

export default function ProductsEvents(props) {
  return (
    <div className="row pb-5">
      {props.products.map((product) => {
        return (
          <div className="col-lg-4 col-md-6 mt-4 pt-2" key={product.id}>
            <div className="blog position-relative overflow-hidden shadow rounded">
              <div className="position-relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  className="img-fluid rounded-top"
                  alt=""
                  style={{
                    width: 500
                  }}
                />
                <div className="overlay rounded-top bg-dark"></div>
              </div>
              <div className="content p-4">
                <h4>
                  <Link
                    to={{ pathname: `/products/${product.id}` }}
                    href="javascript:void(0)"
                    className="title text-dark"
                  >
                    {product.name}
                  </Link>
                </h4>
                <p className="text-muted">{product.description}</p>
                <Link
                  to={{ pathname: `/products/${product.id}` }}
                  className="text-dark readmore"
                >
                  Read more <i className="mdi mdi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
