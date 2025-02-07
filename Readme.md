# 📌 Air Quality REST API Documentation

## **Overview**
This API provides air quality information for a given GPS coordinate by fetching data from the **IQAir API**. It also runs a scheduled **cron job** to store air quality data for Paris every minute.

---

## **1. Installation & Setup**

### **1.1 Clone the Repository**
```bash
git clone https://github.com/mohamedosama93/air-quality-api
```

### **1.2 Set Up Environment Variables**
Create a `.env` file in the project root and configure:
```env
NODE_ENV=development
PORT=3000

# Database Configuration
DB_DIALECT=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=air_quality

# IQAir API Key
IQAIR_API_KEY=your_api_key
```

### **1.4 Run the Application**
```bash
npm start
```

---

## **2. API Endpoints**

### **2.1 Get Air Quality by Coordinates**
**Endpoint:** `GET /api/air-quality`

**Query Parameters:**
| Parameter  | Type  | Description |
|------------|--------|------------------|
| `latitude` | float  | Latitude of the location |
| `longitude` | float  | Longitude of the location |

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/air-quality?latitude=48.8566&longitude=2.3522"
```

**Example Response:**
```json
{
    "status": "success",
    "data": {
        "city": "Paris",
        "state": "Ile-de-France",
        "country": "France",
        "location": {
            "type": "Point",
            "coordinates": [2.3522, 48.8566]
        },
        "current": {
            "pollution": {
                "ts": "2025-02-07T17:00:00.000Z",
                "aqius": 75,
                "mainus": "p2",
                "aqicn": 31,
                "maincn": "p2"
            }
        }
    }
}
```

---

### **2.2 Get Most Polluted Time for Paris**
**Endpoint:** `GET /api/air-quality/most-polluted`

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/air-quality/most-polluted"
```

**Example Response:**
```json
{
  "id": 2,
  "ts": "2025-02-07T17:00:00.000Z",
  "aqius": 76,
  "mainus": "p2",
  "aqicn": 32,
  "maincn": "p2"
}
```

---

## **3. Database Schema**
The database stores air quality data collected by the cron job.

| Column  | Type   | Description |
|---------|--------|----------------|
| `id`    | INT (PK) | Auto-incremented ID |
| `ts`    | DATETIME | Timestamp of data collection |
| `aqius` | INT  | AQI value (US scale) |
| `mainus` | STRING | Main pollutant (US) |
| `aqicn` | INT  | AQI value (China scale) |
| `maincn` | STRING | Main pollutant (China) |

---

## **4. Cron Job**
A scheduled job runs **every 1 minute** to fetch air quality for Paris and store it in the database.

**Cron Job Setup:** (Runs automatically when the app starts)

---

## **5. Testing**

### **5.1 Unit Tests**
To run unit tests:
```bash
npm test-unit
```

### **5.2 Integration Tests**
To run integration tests using SQLite:
```bash
npm test-integration
```

---

## **6. Docker Setup**

### **6.1 Build & Run with Docker Compose**
```bash
docker-compose up --build
```

### **6.2 Run Migrations**
```bash
docker exec -it air-quality-app npx sequelize-cli db:migrate
```

### **6.3 Stop Containers**
```bash
docker-compose down
```

---

## **7. Environment Variables**
| Variable  | Default | Description |
|------------|---------|----------------|
| `NODE_ENV` | development | Application environment |
| `PORT` | 3000 | API server port |
| `DB_DIALECT` | mysql | Database type |
| `DB_HOST` | localhost | Database host |
| `DB_USER` | root | Database user |
| `DB_PASSWORD` | rootpassword | Database password |
| `DB_NAME` | air_quality | Database name |
| `IQAIR_API_KEY` | (your key) | API key for IQAir |

---

## **Conclusion**
This API fetches real-time air quality data, stores it in a MySQL database, and provides endpoints for fetching the latest data and analyzing pollution trends. The system runs in a **Dockerized environment**, supports **cron jobs**, and includes **testing and documentation**.

