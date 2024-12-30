const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 6001;

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
          Authorization:
            "Key_Live Y2FwdGFpbl9jaGVmLkNhcHRhaW5DaGVmQXBwOmU0NzliNjkwZmVlMzQ2ZTdhMDBjMWZjMjc3MTZjNDc1",
        },
      }
    );
    console.log('New Request')
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
