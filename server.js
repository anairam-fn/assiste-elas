const app = require("./src/app.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is on port ${PORT}`));
