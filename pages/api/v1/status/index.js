function status(request, response) {
  response
    .status(200)
    .json({ status: "ok", message: "Server is running smoothly!" });
}

export default status;
