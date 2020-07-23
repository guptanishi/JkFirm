
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            invoiceNumber: String,
            invoiceDate: String,
            delMode: String,
            userName: String,
            products: Array,
            customerId: String,
            customerName: String,
            paymentMode: String,
            totalAmount: String,
            payment: String,
            paymentDate: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const CashMemo = mongoose.model("cashMemo", schema);
    return CashMemo;
};
