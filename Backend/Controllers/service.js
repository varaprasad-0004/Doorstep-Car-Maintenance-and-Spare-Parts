import car from "../Models/car.js";

export const service = (req, res) => {
    console.log(req.body.formdata);
    const { username, date, fname, email, address, number, anumber, vnumber, engine, model, year, colour } = req.body.formdata;
    const stud = new car({
        username, date, fname, email, address, number, anumber, vnumber, engine, model, year, colour});        
    stud.save()
        .then(() => {
            res.send({});
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error while saving data");
        });
};

export const getser = async (req, res) => {
    try {
      const addressData = await car.find();
      res.status(200).json(addressData);
    } catch (error) {
      console.error('Error fetching address data:', error);
      res.status(500).json({ error: 'An error occurred.' });
    }
};