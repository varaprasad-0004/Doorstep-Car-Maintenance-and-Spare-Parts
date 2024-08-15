import cart from "../Models/cart.js";
import auth from "../Models/auth.js";

export const addtocart = async (req, res) => {
  try {
    const { formattedDate, title, price, username, image } = req.body;
    const cartItem = new cart({ username, date: formattedDate, title, price, image });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};


export const getitems = async (req, res, next) => {
    const username = req.query.username;
  
    try {
      const cartitems = await cart.find({ username });
      res.status(200).json({ cartitems });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving cart items" });
    }
};

export const deleteitem = (req, res) => {
    const cartId = req.params.id;
  
    cart.findByIdAndRemove(cartId)
      .then(() => {
        res.send({ message: 'Cart Item Deleted Successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error while deleting cart item' });
      });
};

export const getadmindata = async (req, res) => {
  try {
    const allCartData = await cart.find();

    // Group the cart items by username
    const groupedData = allCartData.reduce((acc, cartItem) => {
      const { username } = cartItem;
      if (!acc[username]) {
        acc[username] = [];
      }
      acc[username].push(cartItem);
      return acc;
    }, {});

    const totalUsers = await auth.countDocuments();

    res.status(200).json({ groupedData, totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};