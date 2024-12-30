const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6001;
const apiKey = process.env.NOON_API_KEY;

app.use(express.json());
app.use(cors());

app.get("/paymentStatusCheckAPI/:orderId", async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  console.log(typeof orderId);
  try {
    const response = await axios.get(
      `https://api.noonpayments.com/payment/v1/order/${orderId}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    console.log("New Request");
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response?.status || 500).send({
      message: error.message || "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
