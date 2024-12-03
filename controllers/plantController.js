const fs = require('fs');
const path = require('path');
const plantsFilePath = path.join(__dirname, '../models/plant.json');

// Fungsi membaca file JSON
const readPlantsData = () => {
    const data = fs.readFileSync(plantsFilePath);
    return JSON.parse(data);
};

// Mendapatkan semua tanaman
exports.getAllPlants = (req, res) => {
    const data = readPlantsData();
    res.json(data.plants);
};

// mendapatkan tanaman berdasarkan class
exports.getPlantByClass = (req, res) => {
    const data = readPlantsData();
    const plantClass = req.params.class;
    const plant = data.plants[plantClass];
    
    if (plant) {
        res.json(plant);
    } else {
        res.status(404).json({ message: "Plant class not found" });
    }
};

/* // POST add new plant class
exports.addPlant = (req, res) => {
    const data = readPlantsData();
    const newClass = req.body.class;
    const newPlant = req.body.plant;

    if (data.plants[newClass]) {
        return res.status(400).json({ message: "Class already exists" });
    }

    data.plants[newClass] = newPlant;
    fs.writeFileSync(plantsFilePath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "New plant class added", data: newPlant });
};

/* // PUT update plant class
exports.updatePlant = (req, res) => {
    const data = readPlantsData();
    const plantClass = req.params.class;
    const updatedPlant = req.body.plant;

    if (!data.plants[plantClass]) {
        return res.status(404).json({ message: "Plant class not found" });
    }

    data.plants[plantClass] = updatedPlant;
    fs.writeFileSync(plantsFilePath, JSON.stringify(data, null, 2));
    res.json({ message: "Plant class updated", data: updatedPlant });
};
 */
// DELETE plant class
/* exports.deletePlant = (req, res) => {
    const data = readPlantsData();
    const plantClass = req.params.class;

    if (!data.plants[plantClass]) {
        return res.status(404).json({ message: "Plant class not found" });
    }

    delete data.plants[plantClass];
    fs.writeFileSync(plantsFilePath, JSON.stringify(data, null, 2));
    res.json({ message: "Plant class deleted" });
};
 */