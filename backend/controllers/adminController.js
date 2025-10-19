import pool from "../config/connectDb.js";
import { v2 as cloudinary } from "cloudinary";

const addfeature = async (req, res) => {
  let connection;
  try {
    const { title, description, total, slots_booked } = req.body;

    // ✅ Validate input
    if (!title || !description || !total) {
      return res.json({ success: false, message: "Missing details" });
    }

    // ✅ Upload image to Cloudinary
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "features",
      });
      imageUrl = uploadResult.secure_url;
    }

    // ✅ Parse slots_booked (date → { time: count })
    const slotsObj = slots_booked ? JSON.parse(slots_booked) : {};

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // ✅ Insert into features table
    const [featureResult] = await connection.query(
      `INSERT INTO features (title, description, img, total) VALUES (?, ?, ?, ?)`,
      [title, description, imageUrl, total]
    );

    const featureId = featureResult.insertId;

    // ✅ Insert slots into feature_slots table
    for (const date in slotsObj) {
      const times = slotsObj[date];
      for (const time in times) {
        const bookedCount = times[time];
        await connection.query(
          `INSERT INTO feature_slots (feature_id, booking_date, booking_time, booked_count) VALUES (?, ?, ?, ?)`,
          [featureId, date, time, bookedCount]
        );
      }
    }

    await connection.commit();

    return res.json({
      success: true,
      message: "Feature added successfully",
      featureId,
    });
  } catch (error) {
    console.error("Addition error:", error.message);
    if (connection) await connection.rollback();
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};

// GET all features with slots
const getFeatures = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    // ✅ Fetch features
    const [features] = await connection.query(`SELECT * FROM features`);

    // ✅ Fetch slots
    const [slots] = await connection.query(`SELECT * FROM feature_slots`);

    // ✅ Group slots under their feature
    const featuresWithSlots = features.map((feature) => {
      const featureSlots = slots
        .filter((slot) => slot.feature_id === feature.id)
        .map((slot) => ({
          date: slot.booking_date,
          time: slot.booking_time,
          booked_count: slot.booked_count,
        }));

      return {
        ...feature,
        slots: featureSlots,
      };
    });

    return res.json({
      success: true,
      data: featuresWithSlots,
    });
  } catch (error) {
    console.error("Fetch error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};



const addHotel = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const { featureId, hotels } = req.body;

    if (!featureId || !hotels || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Feature ID, hotels, and images are required",
      });
    }

    // Parse hotels JSON (sent as string in formData)
    const parsedHotels = JSON.parse(hotels);

    if (parsedHotels.length !== req.files.length) {
      return res.status(400).json({
        success: false,
        message: "Number of hotels must match number of images",
      });
    }

    const insertedHotels = [];

    // ✅ Upload each image to Cloudinary
    for (let i = 0; i < parsedHotels.length; i++) {
      const { name, price } = parsedHotels[i];
      if (!name || !price) {
        return res.status(400).json({
          success: false,
          message: "Each hotel must have name and price",
        });
      }

      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.files[i].path, {
        folder: "hotels",
      });

      const imageUrl = uploadResult.secure_url;

      // Save hotel in DB
      const [result] = await connection.query(
        `INSERT INTO hotels (feature_id, name, price, image) VALUES (?, ?, ?, ?)`,
        [featureId, name, price, imageUrl]
      );

      insertedHotels.push({
        id: result.insertId,
        featureId,
        name,
        price,
        image: imageUrl,
      });
    }

    return res.json({
      success: true,
      message: "Hotels added successfully",
      hotels: insertedHotels,
    });
  } catch (error) {
    console.error("addHotels error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};


// Get all hotels
const getHotels = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query(
      `SELECT * FROM hotels ORDER BY id DESC`
    );

    return res.json({ success: true, data: rows });
  } catch (error) {
    console.error("getHotels error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};





export { addfeature,  getFeatures, addHotel ,getHotels};
