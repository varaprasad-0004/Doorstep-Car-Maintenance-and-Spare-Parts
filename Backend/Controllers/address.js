import address from "../Models/address.js";

export const daddress = async (req, res) => {
  try {
    const { username, formdata, date } = req.body;
    const { fname, email, dno, street, district, state, pin, monum } = formdata;

    const addressData = new address({ date, username, status: 'ordered', fname, email, dno, street, district, state, pin, monum });
    await addressData.save();

    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

export const getadd = async (req, res) => {
    try {
      // Fetch all address data from the database
      const addressData = await address.find();
      res.status(200).json(addressData);
    } catch (error) {
      console.error('Error fetching address data:', error);
      res.status(500).json({ error: 'An error occurred.' });
    }
};