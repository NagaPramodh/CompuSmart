import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductsData } from "../Data/ProductListData";
import Chip from "@mui/material/Chip";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
import DifferenceIcon from "@mui/icons-material/Difference";

export default function Products() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredProducts = ProductsData.filter((product) =>
    product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductSelection = (product) => {
    const alreadySelected = selectedProducts.find((p) => p.id === product.id);
    if (alreadySelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let productIndex = 0;
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ margin: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <Button
        variant="contained"
        onClick={openModal}
        style={{
          width: "400px",
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "20px",
        }}
        disabled={selectedProducts.length >= 2 ? false : true}
      >
        Compare Products ({selectedProducts.length})
      </Button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => {
              return (
                <Card
                  sx={{
                    width: 345,
                    position: "relative",
                    borderRadius: "20px",
                    padding: "10px",
                    // backgroundColor: "#C5C6C7",
                  }}
                  key={productIndex}
                >
                  <Checkbox
                    checked={selectedProducts.some((p) => p.id === product.id)}
                    onChange={() => toggleProductSelection(product)}
                    sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                  />
                  <CardMedia
                    sx={{
                      height: 180,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    image={product.img}
                    title={product.brand}
                  />
                  <CardContent>
                    <Tooltip title={product.model} placement="top">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          maxWidth: 200,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.model}
                      </Typography>
                    </Tooltip>
                    <Chip label={product.colour} color="primary" size="small" />
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Windows version:{product.window_version}
                      <br />
                      Internal storage:{product.internal_storage}
                      <br />
                      Ram:{product.ram}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "30px",
                        alignItems: "center",
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    >
                      {/* <Chip
                        label={product.colour}
                        color="primary"
                        size="small"
                      /> */}
                      Price:{" "}
                      <Chip
                        label={product.price}
                        color="secondary"
                        size="big"
                        style={{ fontWeight: 700, fontSize: "20px" }}
                      />
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      style={{
                        width: "200px",
                        borderRadius: "20px",
                      }}
                    >
                      Add to Cart
                    </Button>
                    {/* <Chip label="Add To Cart" color="primary" size="small" /> */}
                    <Button
                      variant="contained"
                      color="success"
                      style={{
                        width: "200px",
                        borderRadius: "20px",
                      }}
                    >
                      Buy Now
                    </Button>
                    {/* <Chip label="Buy Now" color="secondary" size="small" /> */}
                  </CardActions>
                </Card>
              );
            })
          : null}
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            display: "flex",
            flexDirection: windowWidth > 600 ? "row" : "column",
            // alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            backgroundColor: "#fff",
            p: 4,
            m: "auto",
            mt: "10%",
            width: "80%",
            overflowX: "auto",
            position: "relative",
            borderRadius: "20px",
          }}
        >
          {selectedProducts.map((product, index) => (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                }}
                onClick={closeModal}
              >
                <CancelIcon />
              </div>

              <Card
                key={index}
                sx={{
                  width: 300,
                  border: "1px solid #ccc",
                  position: "relative",
                  borderRadius: "20px",
                }}
              >
                <Checkbox
                  checked={selectedProducts.some((p) => p.id === product.id)}
                  onChange={() => toggleProductSelection(product)}
                  sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                />
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.img}
                  title={product.brand}
                />
                <CardContent>
                  <Tooltip title={product.model} placement="top">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.model}
                    </Typography>
                  </Tooltip>
                  {[
                    "window_version",
                    "internal_storage",
                    "ram",
                    "colour",
                    "price",
                  ].map((key) => {
                    const isDifferent = selectedProducts.some(
                      (p) => p[key] !== product[key]
                    );
                    return (
                      <Typography
                        key={key}
                        variant="body2"
                        sx={{
                          // backgroundColor: isDifferent
                          //   ? "#D3D3D3"
                          //   : "transparent",
                          // borderRadius: 1,
                          p: 0.5,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        {isDifferent ? <DifferenceIcon /> : null}
                        {key}:{" "}
                        {isDifferent ? (
                          <span
                            style={{
                              backgroundColor: "yellow",
                              padding: "5px",
                              borderRadius: "20px",
                            }}
                          >
                            {product[key]}
                          </span>
                        ) : (
                          product[key]
                        )}
                      </Typography>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
