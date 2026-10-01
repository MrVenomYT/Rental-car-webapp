import { MongoClient, Db } from "mongodb";
import fs from "fs";
import path from "path";
import { comprehensiveVehicleCatalog } from "../data/vehicleCatalog";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "drivenest";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const LOCAL_DB_FILE = path.join(process.cwd(), "data", "persistent_storage.json");

interface LocalStorageData {
  cars: any[];
  bookings: any[];
  inquiries: any[];
  listings: any[];
}

function getInitialData(): LocalStorageData {
  return {
    cars: comprehensiveVehicleCatalog,
    bookings: [
      {
        id: "BK-1001",
        customerName: "Michael Chang",
        customerEmail: "michael.c@example.com",
        customerPhone: "(415) 555 0192",
        carName: "2024 BMW M3 (G80)",
        carId: "bmw-m3-2024",
        startDate: "2026-10-10",
        endDate: "2026-10-14",
        days: 4,
        totalAmount: 1180,
        status: "Confirmed",
        createdAt: "2026-10-01T08:00:00.000Z",
      },
      {
        id: "BK-1002",
        customerName: "Sarah Jenkins",
        customerEmail: "sarah.j@example.com",
        customerPhone: "(310) 555 0148",
        carName: "2024 Tesla Model 3 (Highland)",
        carId: "tesla-model3-2024",
        startDate: "2026-10-12",
        endDate: "2026-10-15",
        days: 3,
        totalAmount: 435,
        status: "Active",
        createdAt: "2026-10-01T08:30:00.000Z",
      },
    ],
    inquiries: [
      {
        id: "INQ-501",
        name: "David Ross",
        email: "dross@business.org",
        phone: "(718) 555 0173",
        subject: "Corporate Fleet Lease for 5 Vehicles",
        message: "Looking for long term corporate rate for executive rentals.",
        status: "New",
        createdAt: "2026-10-01T08:15:00.000Z",
      },
    ],
    listings: [],
  };
}

function readLocalDb(): LocalStorageData {
  try {
    if (!fs.existsSync(LOCAL_DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const content = fs.readFileSync(LOCAL_DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return getInitialData();
  }
}

function writeLocalDb(data: LocalStorageData): void {
  try {
    const dir = path.dirname(LOCAL_DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Local database write error:", err);
  }
}

export async function connectToDatabase(): Promise<{ client: MongoClient | null; db: Db | null }> {
  if (!uri) {
    return { client: null, db: null };
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000,
    });
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    // Check if cars collection is empty, seed if necessary
    const carsCount = await db.collection("cars").countDocuments();
    if (carsCount === 0) {
      await db.collection("cars").insertMany(comprehensiveVehicleCatalog);
    }

    return { client, db };
  } catch (error) {
    console.warn("MongoDB connection unavailable, using persistent server file database:", error);
    return { client: null, db: null };
  }
}

export async function getCarsFromStorage() {
  const { db } = await connectToDatabase();
  if (db) {
    const cars = await db.collection("cars").find({}).toArray();
    if (cars.length > 0) return cars;
  }
  const local = readLocalDb();
  return local.cars;
}

export async function saveCarToStorage(car: any) {
  const { db } = await connectToDatabase();
  if (db) {
    await db.collection("cars").insertOne(car);
  }
  const local = readLocalDb();
  local.cars.unshift(car);
  writeLocalDb(local);
  return car;
}

export async function deleteCarFromStorage(carId: string) {
  const { db } = await connectToDatabase();
  if (db) {
    await db.collection("cars").deleteOne({ id: carId });
  }
  const local = readLocalDb();
  local.cars = local.cars.filter((c) => c.id !== carId);
  writeLocalDb(local);
  return { success: true };
}

export async function getBookingsFromStorage() {
  const { db } = await connectToDatabase();
  if (db) {
    const bookings = await db.collection("bookings").find({}).sort({ createdAt: -1 }).toArray();
    if (bookings.length > 0) return bookings;
  }
  const local = readLocalDb();
  return local.bookings;
}

export async function saveBookingToStorage(booking: any) {
  const { db } = await connectToDatabase();
  if (db) {
    await db.collection("bookings").insertOne(booking);
  }
  const local = readLocalDb();
  local.bookings.unshift(booking);
  writeLocalDb(local);
  return booking;
}

export async function updateBookingStatusInStorage(bookingId: string, status: string) {
  const { db } = await connectToDatabase();
  if (db) {
    await db.collection("bookings").updateOne({ id: bookingId }, { $set: { status } });
  }
  const local = readLocalDb();
  const found = local.bookings.find((b) => b.id === bookingId);
  if (found) {
    found.status = status;
    writeLocalDb(local);
  }
  return { success: true };
}

export async function getInquiriesFromStorage() {
  const { db } = await connectToDatabase();
  if (db) {
    const inquiries = await db.collection("inquiries").find({}).sort({ createdAt: -1 }).toArray();
    if (inquiries.length > 0) return inquiries;
  }
  const local = readLocalDb();
  return local.inquiries;
}

export async function saveInquiryToStorage(inquiry: any) {
  const { db } = await connectToDatabase();
  if (db) {
    await db.collection("inquiries").insertOne(inquiry);
  }
  const local = readLocalDb();
  local.inquiries.unshift(inquiry);
  writeLocalDb(local);
  return inquiry;
}
