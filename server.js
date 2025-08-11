// server.js
// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security
const bcrypt = require('bcrypt');
const saltRounds = 10;

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create an instance of express
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost", // Database host
    user: "danialves",      // Database username
    password: "AcinAcademy2025", // Database password
    database: "itourdb" // Name of the database
});

// Serves files from the uploads folder
app.use('/uploads', express.static('uploads'));


// Define a route for the root URL '/'
app.get('/', (req, res) => {
    return res.json("From backend side");
});

// Test backend connection
app.get('/users', (req, res) => {
    const sql = "select * from users"; 
    db.query(sql, (err, data) => {     
        if (err) return res.json(err); 
        return res.json(data);         
    })
});
// Endpoint para devolver el usuario autenticado (dummy, sin sesión)
app.get('/user', (req, res) => {
    // Si tuvieras sesión, aquí la usarías para identificar el usuario
    // Por ahora, simplemente devuelve null o un objeto vacío
    return res.status(200).json(null);
});


// Start the server and listen on port 8000
app.listen(8000, () => {
    console.log("listening");
});

/********************************/
/**                            **/
/**       User Endpoints       **/
/**                            **/
/********************************/


// User Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    db.query(
      `SELECT 
        u.id, 
        name,
        email,
        password, 
        type, 
        u.created_at, 
        profile_image, 
        c.id AS car_id, 
        registration, 
        brand, 
        model, 
        color,
        category, 
        capacity AS seatingCapacity, 
        description AS additionalInfo
      FROM users u 
        LEFT JOIN cars c ON (u.id = guide_id)
      WHERE email = ?;`,
      [email],
      async (error, results) => { 
        if (error) {
          console.error('Error during login:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
          const user = results[0];
          const normalizedHash = user.password.replace(/^\$2y\$/, '$2b$');
          const match = await bcrypt.compare(password, normalizedHash); 

          if (match) {
            res.status(200).json({ message: 'Login successful', user });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    );
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});


// User Register
app.post('/register', upload.single('profileImage'), async (req, res) => {
  let name = req.body.fullName;
  let email = req.body.email;
  let password = req.body.password;
  let type = req.body.user_type;
  let hasCar;
  hasCar = type && req.body.registration != null? hasCar = 1 : hasCar = 0;
  let created_at = new Date();
  let profile_image;
  profile_image = req.file? `uploads/${req.file.filename}` : null;

	if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Hash the given password
        const hash = await bcrypt.hash(password, saltRounds);

        // Insert user
        await db.promise().query(
            `INSERT INTO users 
                (name, email, type, password, created_at, profile_image) 
                VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, type, hash, created_at, profile_image]
        );

        const [userRow] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // If user has a car, insert car info
        if (hasCar) {
            let registration = req.body.registration;
            let brand = req.body.brand;
            let model = req.body.model;
            let color = req.body.color;
            let capacity = req.body.capacity;
            let description = req.body.description;

            const guide_id = userRow[0]?.id;
            if (!guide_id) {
                return res.status(404).json({ error: 'Guide not found after registration' });
            }

            await db.promise().query(
                `INSERT INTO cars 
                    (guide_id, registration, brand, model, color, capacity, description) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [guide_id, registration, brand, model, color, capacity, description]
            );
        }
        const [carRow] = await db.promise().query(
            `SELECT 
                c.id AS car_id, 
                registration, 
                brand, 
                model, 
                color, 
                category, 
                capacity AS seatingCapacity, 
                description AS additionalInfo 
            FROM users u 
              LEFT JOIN cars c ON (u.id = guide_id)
            WHERE guide_id = ?`,
            [userRow[0].id]
        );
        const userWithCar = {
            ...userRow[0],
            ...(carRow[0] ? carRow[0] : {})
        };
        console.log('o que mandei',userWithCar)
        res.status(200).json({ message: 'User registered successfully', userWithCar });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Logout
app.post('/logout', async (req, res) => {
    res.clearCookie();
    res.status(200).json({ message: 'Logout Successful' })
});

// Update User Profile
app.put('/users/:userID', upload.single('profileImage'), async (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let profile_image;
  profile_image = req.file? `uploads/${req.file.filename}` : null;

  try {
    // if user uploaded a new photo, change photo
    if (profile_image) {
      db.query(
        `UPDATE users SET name = ?, profile_image = ? WHERE id = ?;`,
        [name, profile_image, id]
      );
    }
    else {
      db.query(
        `UPDATE users SET name = ? WHERE id = ?;`,
        [name, id]
      );
    }
    // if user is a guide, change car info
    if (req.body.licensePlate) {
      let registration = req.body.licensePlate;
      let brand = req.body.brand;
      let model = req.body.model;
      let color = req.body.color;
      let capacity = req.body.seatingCapacity;
      let description = req.body.additionalInfo;
      db.query(
        `UPDATE cars SET registration = ?, brand = ?, model = ?, color = ?, capacity = ?, description = ? WHERE guide_id = ?;`,
        [registration, brand, model, color, capacity, description, id]
      );
    }
    const [userRow] = await db.promise().query(
      `SELECT 
          u.id, 
          name,
          email,
          password, 
          type, 
          u.created_at, 
          profile_image, 
          c.id AS car_id, 
          registration, 
          brand, 
          model, 
          color,
          category, 
          capacity AS seatingCapacity, 
          description AS additionalInfo
        FROM users u 
          LEFT JOIN cars c ON (u.id = guide_id)
        WHERE u.id = ?;`,
        [id]
    );
    const user = userRow[0];
    res.status(200).json({ message: 'User Profile updated successfully', user });
  } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}) 


/********************************/
/**                            **/
/**       Tour Endpoints       **/
/**                            **/
/********************************/

// Fetch All Tours

app.get('/routes/:routeId/places', async (req, res) => {
  const { routeId } = req.params;
  try {
    const [places] = await db.promise().query(
      `SELECT 
        p.id, 
        p.name, 
        p.latitude, 
        p.longitude, 
        p.category, 
        v.order
      FROM visits v
        JOIN places p ON v.place_id = p.id
      WHERE v.tour_id = ?
      ORDER BY v.order ASC`,
      [routeId]
    );
    res.status(200).json({ places });
  } catch (error) {
    console.error('Error fetching route places:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// Fetch All Routes 
app.get('/routes', (req, res) => {
    db.query('SELECT * FROM tours', (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Formatear la fecha created_at a formato legible (ej: DD/MM/YYYY HH:mm)
        const formattedResults = results.map(route => {
            let formattedDate = '';
            if (route.created_at) {
                const dateObj = new Date(route.created_at);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
            }
            let locationsArr = [];
            if (route.locations) {
                try {
                    locationsArr = JSON.parse(route.locations);
                    if (!Array.isArray(locationsArr)) locationsArr = [];
                } catch (e) {
                    locationsArr = [];
                }
            }
            return {
                ...route,
                created_at_formatted: formattedDate,
                locations: locationsArr
            };
        });
        res.status(200).json(formattedResults);
    });
});

// Criar nova rota
app.post('/routes', async (req, res) => {
  const {
    name,
    description,
    duration,
    locations,
    createdBy,
    createdByName,
    isPublic,
    routeImageBase64
  } = req.body;

  try {
    const createdAt = new Date();

    const [result] = await db.promise().query(
      `INSERT INTO tours (name, description, duration, locations, created_by, created_by_name, is_public, route_image, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        duration,
        JSON.stringify(locations),
        createdBy,
        createdByName,
        isPublic ?? true,
        routeImageBase64 ?? null,
        createdAt
      ]
    );

    const insertedId = result.insertId;

    const [newRoute] = await db.promise().query(
      `SELECT * FROM tours WHERE id = ?`,
      [insertedId]
    );

    let formattedRoute = newRoute[0];
    formattedRoute.locations = JSON.parse(formattedRoute.locations || '[]');

    res.status(201).json(formattedRoute);
  } catch (error) {
    console.error('Erro ao criar rota:', error);
    res.status(500).json({ error: 'Erro ao criar rota' });
  }
});

// Atualizar rota existente
app.put('/routes/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const fields = [];
    const values = [];

    for (const key in updates) {
      if (key === 'locations') {
        fields.push(`${key} = ?`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    values.push(id);

    await db.promise().query(
      `UPDATE tours SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    const [updated] = await db.promise().query(
      `SELECT * FROM tours WHERE id = ?`,
      [id]
    );

    const route = updated[0];
    route.locations = JSON.parse(route.locations || '[]');

    res.status(200).json(route);
  } catch (error) {
    console.error('Erro ao atualizar rota:', error);
    res.status(500).json({ error: 'Erro ao atualizar rota' });
  }
});

// Eliminar rota existente
app.delete('/routes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query(
      `DELETE FROM tours WHERE id = ?`,
      [id]
    );

    res.status(200).json({ message: 'Rota eliminada com sucesso' });
  } catch (error) {
    console.error('Erro ao eliminar rota:', error);
    res.status(500).json({ error: 'Erro ao eliminar rota' });
  }
});




/*********************************/
/**                             **/
/**       Guide Endpoints       **/
/**                             **/
/*********************************/

// Fetch All Guides
app.get('/guides', (req, res) => {
    db.query(
        `WITH ratings AS 
            (SELECT 
                guide_id, 
                ROUND(AVG(rating_guide)/10, 2) AS averageRatings,
                COUNT(*) AS totalRatings
            FROM reservations 
            GROUP BY guide_id), 
        number_tours AS
            (SELECT 
                guide_id, 
                COUNT(*) AS routesCount 
            FROM works 
            GROUP BY guide_id)
        SELECT 
            g.id, 
            name, 
            email, 
            g.created_at,
            averageRatings,
            totalRatings,
            routesCount, 
            registration, 
            brand, 
            model, 
            color, 
            category, 
            capacity AS seatingCapacity,
            description AS additionalInfo,   
            profile_image
        FROM users g 
            LEFT JOIN cars c ON (g.id = c.guide_id) 
            LEFT JOIN ratings r ON (g.id = r.guide_id) 
            LEFT JOIN number_tours n ON (g.id = n.guide_id) 
        WHERE type = 1;`, 
        (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Guides Listed Succesfully', results});
    });
});

// Fetch the Tours of a specific Guide
app.get('/routes/guide/:guideID', async (req, res) => {
    const guideID = req.params["guideID"];

    try {
        // First query: get tours for the guide
        const [results] = await db.promise().query(
            `WITH number AS 
                (SELECT 
                    tour_id, 
                    count(*) AS locations 
                FROM visits 
                GROUP BY tour_id) 
            SELECT 
                w.tour_id AS id,
                t.name AS name,
                t.created_at AS created_at, 
                w.guide_id AS guide_id,   
                t.duration, 
                t.tour_image,
                locations
            FROM tours t 
                JOIN works w ON (t.id = tour_id) 
                JOIN users g ON (g.id = guide_id) 
                JOIN number n ON (n.tour_id = t.id) 
            WHERE g.id = ?;`,
            [guideID]
        );

        // Second query: get locations for each tour
        const routesWithLocations = await Promise.all(results.map(async (route) => {
            try {
                const [places] = await db.promise().query(
                    `SELECT 
                      p.id, 
                      p.name, 
                      p.latitude,
                      p.longitude, 
                      p.category, 
                      v.order
                    FROM visits v
                      JOIN places p ON v.place_id = p.id
                    WHERE v.tour_id = ?
                    ORDER BY v.order ASC`,
                    [route.id]
                );

                const locations = places.map(p => ({
                    id: p.id,
                    name: p.name,
                    latitude: p.latitude,
                    longitude: p.longitude,
                    category: p.category,
                    order: p.order
                }));

                return { ...route, locations };
            } catch (err) {
                console.error(`Error fetching places for tour ${route.id}:`, err);
                return { ...route, locations: [] };
            }
        }));

        // Send the final response
        res.status(200).json({ message: 'Tours Listed Successfully', results: routesWithLocations });
    } catch (error) {
        console.error('Error fetching tours:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



/**********************************/
/**                              **/
/**     Reservation Endpoints    **/
/**                              **/
/**********************************/

// Criar nova reserva
app.post('/reservations', async (req, res) => {
  const {
    guideId,
    tourId,
    userId,
    selectedDate,
    selectedHours
  } = req.body;
  
  const createdAt = new Date();
  let selectedTime = new Date(selectedDate + ' ' + selectedHours[0]); 

  try {
    const [result] = await db.promise().query(
      `INSERT INTO reservations (
        tour_id, guide_id, user_id, 
        selected_time, status, created_at
      ) VALUES (?, ?, ?, ?, 'confirmed', ?)`,
      [
        tourId, guideId, userId, 
        selectedTime, createdAt
      ]
    );

    return res.status(201).json({ message: 'Reserva criada com sucesso', result });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    return res.status(500).json({ error: 'Erro ao criar reserva' });
  }
});

// Listar reservas do utilizador
app.get('/reservations/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT 
        r.id,
        t.name AS routeName,
        t.tour_image AS routeImage,
        g.name AS guideName,
        DATE(selected_time) AS selectedDate,
        TIME(selected_time) AS selectedHours,
        t.duration AS totalHours,
        r.rating_guide AS rating,
        r.created_at AS createdAt, 
        r.status
      FROM reservations r
        JOIN tours t ON (r.tour_id = t.id)
        JOIN users g ON (r.guide_id = g.id)
      WHERE user_id = ? 
      ORDER BY r.created_at DESC`,
      [userId]
    );
    
    return res.status(200).json({message: 'Reservations listed successfully', results: rows});
  } catch (error) {
    console.error('Erro ao buscar reservas do utilizador:', error);
    return res.status(500).json({ error: 'Erro ao buscar reservas' });
  }
});

// Cancelar reserva
app.put('/reservations/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const cancelledAt = new Date();

  try {
    await db.promise().query(
      `UPDATE reservations SET status = 'cancelled', updated_at = ? WHERE id = ?`,
      [cancelledAt, id]
    );

    return res.status(200).json({ message: 'Reserva cancelada com sucesso' });
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error);
    return res.status(500).json({ error: 'Erro ao cancelar reserva' });
  }
});

// Eliminar reserva permanentemente
app.delete('/reservations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query(`DELETE FROM reservations WHERE id = ?`, [id]);
    return res.status(200).json({ message: 'Reserva eliminada com sucesso' });
  } catch (error) {
    console.error('Erro ao eliminar reserva:', error);
    return res.status(500).json({ error: 'Erro ao eliminar reserva' });
  }
});

// Submeter avaliação
app.put('/ratings', async (req, res) => {
  const {
    reservationId,
    rating
  } = req.body;

  try {
    // Verificar se a reserva já foi avaliada
    const [existing] = await db.promise().query(
      `SELECT rating_guide FROM reservations WHERE id = ?`,
      [reservationId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    if (existing[0].rated) {
      return res.status(400).json({ error: 'Reserva já avaliada' });
    }

    // Atualizar reserva como avaliada
    await db.promise().query(
      `UPDATE reservations SET rating_guide = ?*10 WHERE id = ?`,
      [rating, reservationId]
    );

    return res.status(200).json({ message: 'Rating submetido com sucesso' });
  } catch (error) {
    console.error('Erro ao submeter rating:', error);
    return res.status(500).json({ error: 'Erro ao submeter rating' });
  }
});

// 📌 Obter todas as reservas para gestão por parte dos guias
app.get('/reservations', async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT 
        r.id,
        r.tour_id AS routeId, 
        t.name AS routeName,
        t.tour_image AS routeImage,
        r.guide_id AS guideId,
        g.name AS guideName,
        r.user_id AS userId,
        u.name AS userName,
        DATE(selected_time) AS selectedDate,
        TIME(selected_time) AS selectedHours,
        t.duration AS totalHours,
        r.rating_guide AS rating,
        r.created_at AS createdAt, 
        r.status
      FROM reservations r
        JOIN tours t ON (r.tour_id = t.id)
        JOIN users g ON (r.guide_id = g.id)
        JOIN users u ON (r.user_id = u.id)
      ORDER BY r.created_at DESC`
    );

    // Transformar os campos JSON em arrays legíveis
    const formattedReservations = rows.map(reserva => {
      return {
        ...reserva,
        selected_hours: JSON.parse(reserva.selected_hours || '[]')
      };
    });

    return res.status(200).json(formattedReservations);
  } catch (error) {
    console.error('Erro ao obter reservas:', error);
    return res.status(500).json({ error: 'Erro ao obter reservas' });
  }
});

// 📌 Cancelar reserva manualmente (ex: por parte do guia)
app.put('/reservations/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const cancelledAt = new Date();

  try {
    await db.promise().query(
      `UPDATE reservations SET status = 'cancelled', cancelled_at = ? WHERE id = ?`,
      [cancelledAt, id]
    );

    return res.status(200).json({ message: 'Reserva cancelada com sucesso' });
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error);
    return res.status(500).json({ error: 'Erro ao cancelar reserva' });
  }
});

/**********************************************/
/**                                          **/
/**         Endpoint para listar guias       **/
/**       com rotas, ratings e veículo       **/
/**                                          **/
/**********************************************/
app.get('/guides', async (req, res) => {
  try {
    // 🔹 Consulta para buscar todos os utilizadores do tipo 'guia'
    const [guides] = await db.execute('SELECT * FROM users WHERE type = 1');

    // 🔹 Consulta para buscar todas as rotas
    const [routes] = await db.execute('SELECT * FROM routes');

    // 🔹 Consulta para buscar todas as avaliações
    const [ratings] = await db.execute('SELECT guideId, AVG(score) AS averageRating, COUNT(*) AS totalRatings FROM ratings GROUP BY guideId');

    // 🔹 Consulta para buscar todos os veículos (caso estejam numa tabela separada)
    const [vehicles] = await db.execute('SELECT * FROM vehicles');

    // 🔹 Combina os dados
    const guidesWithRoutes = guides.map((guide) => {
      const userRoutes = routes.filter(route => route.createdBy === guide.id);
      const ratingInfo = ratings.find(r => r.guideId === guide.id) || { averageRating: 0, totalRatings: 0 };
      const vehicle = vehicles.find(v => v.userId === guide.id) || null;

      return {
        ...guide,
        routes: userRoutes,
        routesCount: userRoutes.length,
        averageRating: ratingInfo.averageRating,
        totalRatings: ratingInfo.totalRatings,
        vehicle: vehicle
      };
    });

    // 🔸 Apenas guias que têm pelo menos uma rota
    const filtered = guidesWithRoutes.filter(g => g.routesCount > 0);

    res.json({ results: filtered });
  } catch (error) {
    console.error('Erro ao buscar guias:', error);
    res.status(500).json({ error: 'Erro interno ao buscar os guias.' });
  }
});


