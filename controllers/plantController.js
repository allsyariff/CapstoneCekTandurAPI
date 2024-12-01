/* const { analyzePlant } = require('../services/mlService');

const analyzeImage = async (req, res) => {
    const { imageUrl } = req.body;

    try {
        const result = await analyzePlant(imageUrl);
        if (result.error) return res.status(404).json({ error: result.error });

        res.status(200).json({ plant: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { analyzeImage };
 */
/* const firebase = require('../db');
const firestore = firebase.firestore();
const col = firestore.collection('plants');

const getAllPlants = async (req, res, next) => {
    let data = [];
    let query = await col.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data());
            data.push(doc.data())
        });
        // console.log(snapshot);
    })
    .catch (err => {
        console.log('Error getting documents', err);
        return res.status(400).send({
            'error' : true,
            'message' : 'error getting documents'
        })
    })
    
    return await res.status(200).send({
        'error' : false,
        'message' : 'Plants fetched successfully',
        'data' : data
    });
}

const getPlantByName = async (req, res, next) => {
    const plantName = req.params.name;
    let data = null;
    let query = await col.where('name', '==', plantName).limit(1).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data());
            data = doc.data()
        });
        // console.log(snapshot);
    })
    .catch (err => {
        console.log('Error getting documents', err);
        return res.status(400).send({
            'error' : true,
            'message' : 'error getting documents'
        })
    })

    if(data == null) {
        return await res.status(404).send({
            'error' : true,
            'message' : `can't found '${plantName}'`,
        });
    }

    return await res.status(200).send({
        'error' : false,
        'message' : 'Plant fetched successfully',
        'data' : data
    });
}

const getDiseaseByName = async (req, res, next) => {
    const plantName = req.params.name;
    let data = null;
    let query = await col.where('name', '==', plantName).limit(1).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data().disease);
            data = doc.data().disease;
        });
        // console.log(snapshot);
    })
    .catch (err => {
        console.log('Error getting documents', err);
        return res.status(400).send({
            'error' : true,
            'message' : 'error getting documents'
        })
    })

    if(data == null) {
        return await res.status(404).send({
            'error' : true,
            'message' : `can't found '${plantName}'`,
        });
    }

    return await res.status(200).send({
        'error' : false,
        'message' : 'Plant fetched successfully',
        'data' : data
    });
}

module.exports = {
    getAllPlants,
    getPlantByName,
    getDiseaseByName
} */

    const fs = require('fs');
    const path = require('path');
    const plantsFilePath = path.join(__dirname, '../models/plant.json');
    
    // Helper function to read the JSON file
    const readPlantsData = () => {
        const data = fs.readFileSync(plantsFilePath);
        return JSON.parse(data);
    };
    
    // GET all plants
    exports.getAllPlants = (req, res) => {
        const data = readPlantsData();
        res.json(data.plants);
    };
    
    
    // Mendapatkan tanaman berdasarkan nama penyakit
    exports.getPlantByDiseaseName = (req, res) => {
        const diseaseName = req.params.disease_name.toLowerCase();
        const plants = Object.values(plantsData.plants);
    
        const result = plants.find(plant => 
        plant.disease_name.toLowerCase() === diseaseName
        );
    
        if (result) {
        res.json(result);
        } else {
        res.status(404).json({ message: 'Tanaman dengan nama penyakit tersebut tidak ditemukan' });
        }
    };
    
    // Mendapatkan tanaman berdasarkan nama tanaman
    exports.getPlantByName = (req, res) => {
        const plantName = req.params.plant_name.toLowerCase();
        const plants = Object.values(plantsData.plants);
    
        // Mencari tanaman berdasarkan nama yang mirip dengan disease_name (jika berbeda gunakan key sesuai)
        const result = plants.find(plant => 
        plant.disease_name.toLowerCase().includes(plantName) // Ini contoh jika nama tanaman sama seperti "nama penyakit"
        );
    
        if (result) {
        res.json(result);
        } else {
        res.status(404).json({ message: 'Tanaman dengan nama tersebut tidak ditemukan' });
        }
    };
    
    
    // GET plant by class
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
    
    // POST add new plant class
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
    
    // PUT update plant class
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
    
    // DELETE plant class
    exports.deletePlant = (req, res) => {
        const data = readPlantsData();
        const plantClass = req.params.class;
    
        if (!data.plants[plantClass]) {
            return res.status(404).json({ message: "Plant class not found" });
        }
    
        delete data.plants[plantClass];
        fs.writeFileSync(plantsFilePath, JSON.stringify(data, null, 2));
        res.json({ message: "Plant class deleted" });
    };
    