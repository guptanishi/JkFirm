module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      customerId: String,
      customerName: String,
      city: String,
      address: String,
      state: String,
      pincode: Number,
      contact: Number,
      emailId: String,
      gstNumber: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Customer = mongoose.model("customers", schema);
  return Customer;
};
