// server.js
// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security
const bcrypt = require('bcrypt');

const multer = require('multer');
const storage = multer.memoryStorage();
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
    user: "itadmin",      // Database username
    password: "1234", // Database password
    database: "iroutedb" // Name of the database
});

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
    let email = req.body.email;
    let password = req.body.password;
    
    if (email && password) {
        db.query(
            'SELECT * FROM users WHERE email = ?', 
            [email], function(error, results, fields) 
            {
                if (error) {
                    console.error('Error during login:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                // If the account exists
                if (results.length > 0) {
                    const user = results[0];
                    const match = bcrypt.compare(password, user.password); // compare plaintext with hash
                    if (match) {
                    res.status(200).json({ message: 'Login successful', user });
                    } else {
                    res.status(401).json({ error: 'Invalid credentials' });
                    }
                } else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            });   
    }; 
});


app.post('/register', async (req, res) => {
    let name = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;
    let type = req.body.user_type;
    // Convertir 'turista' a 0 y 'guia' a 1
    if (type === 'turista') type = 0;
    else if (type === 'guia') type = 1;
    let hasCar;
    hasCar = type === 1 && req.body.registration != null ? 1 : 0;

    if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Obtener la imagen de perfil en base64 (opcional)
        let profile_image = req.body.profile_image || req.body.profileImage || null;

        // Insertar usuario con imagen de perfil
        await db.promise().query(
            'INSERT INTO users (name, email, type, password, profile_image) VALUES (?, ?, ?, ?, ?)',
            [name, email, type, password, profile_image]
        );

        const [userRow] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // If user has a car, insert car info
        if (hasCar) {
            console.log('this guide has a car!')
            let registration = req.body.registration;
            let brand = req.body.brand;
            let model = req.body.model;
            let color = req.body.color;

            const guide_id = userRow[0]?.id;
            if (!guide_id) {
                return res.status(404).json({ error: 'Guide not found after registration' });
            }

            await db.promise().query(
                'INSERT INTO cars (guide_id, registration, brand, model, color) VALUES (?, ?, ?, ?, ?)',
                [guide_id, registration, brand, model, color]
            );
        }
        const user = userRow[0];

        res.status(200).json({ message: 'User registered successfully', user });
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


/********************************/
/**                            **/
/**       Tour Endpoints       **/
/**                            **/
/********************************/

// Fetch All Tours

// Fetch All Routes ()
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
app.get('/tours', (req, res) => {
    db.query('SELECT * FROM tours', (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Tours Listed Succesfully', results});
    });
});

// server.js (CONTINUAÇÃO COM ROTAS POST, PUT, DELETE PARA ROUTES)

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
        `SELECT 
            g.id, 
            name, 
            email, 
            g.created_at, 
            registration, 
            brand, 
            model, 
            color, 
            category 
        FROM users g LEFT JOIN cars c ON (g.id = guide_id) 
        WHERE type = 1;`, 
        (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
        console.log(results);
        res.status(200).json({ message: 'Tours Listed Succesfully', results});
    });
});

// Fetch the Tours of a specific Guide
app.get('/routes/guide/:guideID', (req, res) => {
    console.log('vou ver as rotas do guia')
    guideID = req.params["guideID"]
    db.query(
        `SELECT 
            w.tour_id, 
            w.guide_id, 
            t.name AS tour_name, 
            g.name AS guide_name, 
            g.created_at, 
            g.type, 
            t.duration, 
            c.registration, 
            c.brand, 
            c.model, 
            c.category 
        FROM tours t JOIN works w ON (t.id = tour_id) 
            RIGHT JOIN users g ON (g.id = guide_id) 
            LEFT JOIN cars c ON (g.id = c.guide_id) 
        WHERE g.id = ?;`,
        [guideID] ,
        (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
        const guideMap = new Map();

        results.forEach(row => {
            if (!guideMap.has(row.guide_id)) {
                guideMap.set(row.guide_id, {
                    guide_id: row.guide_id,
                    guide_name: row.guide_name,
                    created_at: row.created_at,
                    type: row.type,
                    registration: row.registration,
                    brand: row.brand,
                    model: row.model, 
                    category: row.category,
                    routes: []
                });
            }

            if (row.tour_id) {
                guideMap.get(row.guide_id).routes.push({
                    id: row.tour_id,
                    name: row.tour_name,
                    duration: row.duration
                });
            }
        });

        // 📌 Endpoint para obter o rating médio de um guia
// Exemplo de chamada: GET /ratings/guide/5
app.get('/ratings/guide/:guideId', async (req, res) => {
  const { guideId } = req.params;

  try {
    // Buscar média e total de avaliações do guia
    const [rows] = await db.promise().query(
      `SELECT AVG(rating) AS averageRating, COUNT(*) AS totalRatings FROM ratings WHERE guide_id = ?`,
      [guideId]
    );

    // Extrair os dados da resposta
    const { averageRating, totalRatings } = rows[0];

    // Devolver os dados formatados
    return res.status(200).json({
      averageRating: averageRating || 0,
      totalRatings: totalRatings || 0
    });
  } catch (error) {
    console.error('Erro ao buscar rating médio do guia:', error);
    return res.status(500).json({ error: 'Erro ao buscar rating médio' });
  }
});

        

        const guides = Array.from(guideMap.values());
        console.log(guides);
        res.status(200).json({ message: 'Tours Listed Succesfully', results});
    });
});




/**********************************/
/**                              **/
/**     Reservation Endpoints    **/
/**                              **/
/**********************************/

// Criar nova reserva
app.post('/reservations', async (req, res) => {
  const {
    userId,
    userName,
    userEmail,
    routeId,
    routeName,
    routeImage,
    routeCreatedBy,
    routeCreatedByName,
    selectedDate,
    selectedHours
  } = req.body;

  const totalHours = selectedHours?.length ?? 0;
  const createdAt = new Date();

  try {
    const [result] = await db.promise().query(
      `INSERT INTO reservations (
        user_id, user_name, user_email, 
        route_id, route_name, route_image, 
        route_created_by, route_created_by_name, 
        selected_date, selected_hours, total_hours, 
        status, rated, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', 0, ?)`,
      [
        userId, userName, userEmail,
        routeId, routeName, routeImage,
        routeCreatedBy, routeCreatedByName,
        selectedDate, JSON.stringify(selectedHours), totalHours,
        createdAt
      ]
    );

    return res.status(201).json({ message: 'Reserva criada com sucesso', reservationId: result.insertId });
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
      `SELECT * FROM reservations WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    rows.forEach(reserva => {
      reserva.selected_hours = JSON.parse(reserva.selected_hours || '[]');
    });

    return res.status(200).json(rows);
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
      `UPDATE reservations SET status = 'cancelled', cancelled_at = ? WHERE id = ?`,
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
app.post('/ratings', async (req, res) => {
  const {
    reservationId,
    guideId,
    guideName,
    touristId,
    touristName,
    routeId,
    routeName,
    rating
  } = req.body;

  const createdAt = new Date();

  try {
    // Verificar se a reserva já foi avaliada
    const [existing] = await db.promise().query(
      `SELECT rated FROM reservations WHERE id = ?`,
      [reservationId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    if (existing[0].rated) {
      return res.status(400).json({ error: 'Reserva já avaliada' });
    }

    // Inserir rating
    await db.promise().query(
      `INSERT INTO ratings (
        reservation_id, guide_id, guide_name, 
        tourist_id, tourist_name, 
        route_id, route_name, rating, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reservationId, guideId, guideName,
        touristId, touristName,
        routeId, routeName, rating, createdAt
      ]
    );

    // Atualizar reserva como avaliada
    await db.promise().query(
      `UPDATE reservations SET rated = 1, rating_submitted_at = ? WHERE id = ?`,
      [createdAt, reservationId]
    );

    // Recalcular média
    await updateGuideAverageRating(guideId);

    return res.status(200).json({ message: 'Rating submetido com sucesso' });
  } catch (error) {
    console.error('Erro ao submeter rating:', error);
    return res.status(500).json({ error: 'Erro ao submeter rating' });
  }
});

// Função interna: atualizar média do guia
async function updateGuideAverageRating(guideId) {
  try {
    const [ratings] = await db.promise().query(
      `SELECT rating FROM ratings WHERE guide_id = ?`,
      [guideId]
    );

    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

    await db.promise().query(
      `UPDATE users SET average_rating = ?, total_ratings = ?, last_rating_update = ? WHERE id = ?`,
      [averageRating, totalRatings, new Date(), guideId]
    );
  } catch (error) {
    console.error('Erro ao atualizar média do guia:', error);
  }
}

// Buscar rating médio do guia
app.get('/guide/:guideId/rating', async (req, res) => {
  const { guideId } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT average_rating, total_ratings FROM users WHERE id = ?`,
      [guideId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Guia não encontrado' });
    }

    const ratingData = {
      averageRating: rows[0].average_rating || 0,
      totalRatings: rows[0].total_ratings || 0
    };

    return res.status(200).json(ratingData);
  } catch (error) {
    console.error('Erro ao buscar média do guia:', error);
    return res.status(500).json({ error: 'Erro ao buscar média do guia' });
  }
});

// 📌 Obter todas as reservas para gestão por parte dos guias
app.get('/reservations', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM reservations ORDER BY created_at DESC');

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