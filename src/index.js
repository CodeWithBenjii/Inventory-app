const app = require("./app");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`);
});
