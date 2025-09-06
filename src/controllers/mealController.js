import Meal from "../models/Meal.js";

// @desc    Get all meals
// @route   GET /api/meals
// @access  Public
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.json(meals);
  } catch (err) {
    console.error("🔥 GET MEALS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get meal by ID
// @route   GET /api/meals/:id
// @access  Public
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json(meal);
  } catch (err) {
    console.error("🔥 GET MEAL BY ID ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a meal (Admin only)
// @route   POST /api/meals
// @access  Private/Admin
export const createMeal = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const meal = await Meal.create({ name, description, price, image });
    res.status(201).json(meal);
  } catch (err) {
    console.error("🔥 CREATE MEAL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a meal (Admin only)
// @route   PUT /api/meals/:id
// @access  Private/Admin
export const updateMeal = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });

    meal.name = name || meal.name;
    meal.description = description || meal.description;
    meal.price = price || meal.price;
    meal.image = image || meal.image;

    const updatedMeal = await meal.save();
    res.json(updatedMeal);
  } catch (err) {
    console.error("🔥 UPDATE MEAL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a meal (Admin only)
// @route   DELETE /api/meals/:id
// @access  Private/Admin
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });

    await meal.remove();
    res.json({ message: "Meal removed" });
  } catch (err) {
    console.error("🔥 DELETE MEAL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
