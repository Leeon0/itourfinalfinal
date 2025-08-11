// server.js
// Importação dos módulos necessários
const express = require('express'); // Framework Express para gerir pedidos HTTP
const mysql = require('mysql2'); // Cliente MySQL2 para Node.js
const cors = require('cors'); // Para segurança web
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

// Instância da aplicação Express
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Ligação à base de dados MySQL
const db = mysql.createConnection({
  host: "localhost", // Servidor da base de dados
  user: "itadmin",      // Nome de utilizador da base de dados
  password: "1234", // Palavra-passe da base de dados
  database: "iroutedb" // Nome da base de dados
});

// Servir ficheiros da pasta de uploads
app.use('/uploads', express.static('uploads'));


// Rota principal para testar o backend
app.get('/', (req, res) => {
    return res.json("From backend side");
});

// Rota para listar todos os utilizadores
app.get('/users', (req, res) => {
    const sql = "select * from users"; 
    db.query(sql, (err, data) => {     
        if (err) return res.json(err); 
        return res.json(data);         
    })
});
// Endpoint para devolver o utilizador autenticado (dummy, sem sessão)
app.get('/user', (req, res) => {
  // Se tivesses sessão, aqui usarias para identificar o utilizador
  // Por agora, simplesmente devolve null ou um objeto vazio
    return res.status(200).json(null);
});


// Iniciar o servidor na porta 8000
app.listen(8000, () => {
    console.log("listening");
});

// ==============================
// Endpoints de Utilizador
// ==============================


// Login de utilizador
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
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
            [email], function(error, results, fields) 
            {
                if (error) {
                    console.error('Error during login:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                // Se a conta existir
                if (results.length > 0) {
                    const user = results[0];
                    const match = bcrypt.compare(password, user.password); // comparar texto simples com hash
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

// Registo de utilizador
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
  // Gerar hash da palavra-passe fornecida
        const hash = await bcrypt.hash(password, saltRounds);

  // Inserir utilizador
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

  // Se o utilizador tiver carro, inserir informação do carro
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
  // Obter o utilizador completo com os dados do carro
        const [fullUserRow] = await db.promise().query(
          `SELECT 
              u.id, 
              u.name,
              u.email,
              u.password, 
              u.type, 
              u.created_at, 
              u.profile_image, 
              c.id AS car_id, 
              c.registration, 
              c.brand, 
              c.model, 
              c.color,
              c.category, 
              c.capacity AS seatingCapacity, 
              c.description AS additionalInfo
            FROM users u 
              LEFT JOIN cars c ON (u.id = c.guide_id)
            WHERE u.id = ?;`,
          [userRow[0].id]
        );
        const user = fullUserRow[0];
        res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout de utilizador
app.post('/logout', async (req, res) => {
    res.clearCookie();
    res.status(200).json({ message: 'Logout Successful' })
});

// Atualizar perfil do utilizador
app.put('/users/:userID', upload.single('profileImage'), async (req, res) => {
  console.log('o que recebi do frontend:', req.body)
  let id = req.body.id;
  let name = req.body.name;
  let profile_image;
  profile_image = req.file? `uploads/${req.file.filename}` : null;

  try {
  // se o utilizador enviou uma nova foto, alterar foto
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
  // se o utilizador for guia, alterar informação do carro
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
          u.name,
          u.email,
          u.password, 
          u.type, 
          u.created_at, 
          u.profile_image, 
          c.id AS car_id, 
          c.registration, 
          c.brand, 
          c.model, 
          c.color,
          c.category, 
          c.capacity AS seatingCapacity, 
          c.description AS additionalInfo
        FROM users u 
          LEFT JOIN cars c ON (u.id = c.guide_id)
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


// ==============================
// Endpoints de Rotas/Tours
// ==============================

// Listar todas as rotas/tours

// Listar todas as rotas (alternativo)

// Endpoint para obter os lugares de uma rota
app.get('/routes/:routeId/places', async (req, res) => {
  const { routeId } = req.params;
  try {
    const [places] = await db.promise().query(
      `SELECT p.id, p.name, p.latitude, p.longitude, p.category, v.order
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





app.get('/routes', (req, res) => {
    db.query('SELECT * FROM tours', async (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
  // Para cada rota, procurar os lugares (paragens) e devolvê-los em locations
        const formattedResults = await Promise.all(results.map(async (route) => {
            // Procurar lugares (paragens) da rota
            let locationsArr = [];
            try {
                const [places] = await db.promise().query(
                    `SELECT p.id, p.name, p.latitude, p.longitude, p.category, v.order
                     FROM visits v
                     JOIN places p ON v.place_id = p.id
                     WHERE v.tour_id = ?
                     ORDER BY v.order ASC`,
                    [route.id]
                );
                locationsArr = places.map(p => ({
                    id: p.id,
                    name: p.name,
                    latitude: p.latitude,
                    longitude: p.longitude,
                    category: p.category,
                    order: p.order
                }));
            } catch (err) {
                locationsArr = [];
            }
            // Formatar a data created_at para formato legível (ex: DD/MM/YYYY HH:mm)
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
            return {
                ...route,
                created_at_formatted: formattedDate,
                createdAt: route.created_at,
                locations: locationsArr
            };
        }));
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

// Continuação: Endpoints POST, PUT, DELETE para rotas

// Criar nova rota
app.post('/routes', upload.single('routeImage'), async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const duration = req.body.duration;
  const locations = req.body.locations ? JSON.parse(req.body.locations) : [];
  const createdBy = req.body.createdBy;
  const createdByName = req.body.createdByName;
  const isPublic = req.body.isPublic ?? true;
  const createdAt = new Date();
  let route_image = null;
  if (req.file) {
    route_image = `uploads/${req.file.filename}`;
  } else if (req.body.routeImageBase64) {
    route_image = req.body.routeImageBase64;
  }

  try {
    const [result] = await db.promise().query(
      `INSERT INTO tours (name, description, duration, created_by, created_by_name, is_public, route_image, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        duration,
        createdBy,
        createdByName,
        isPublic,
        route_image,
        createdAt
      ]
    );

    const insertedId = result.insertId;

  // Log para depuração
    console.log('Insertando en works:', { createdBy, insertedId });
  // Associar a rota ao guia na tabela works
    await db.promise().query(
      'INSERT INTO works (guide_id, tour_id) VALUES (?, ?)',
      [createdBy, insertedId]
    );
// Inserir visitas para cada local (paragem) para associar à rota
    for (let i = 0; i < locations.length; i++) {
      const loc = locations[i];
// Procurar se já existe um lugar com o mesmo nome
      let placeId;
      const [foundPlace] = await db.promise().query(
        'SELECT id FROM places WHERE name = ?',
        [loc.name]
      );
      if (foundPlace.length > 0) {
// Se existir, usar esse id
        placeId = foundPlace[0].id;
      } else {
// Se não existir, criar novo lugar
        const categoryValue = loc.category != null && loc.category !== '' ? loc.category : 'other';
        const [insertPlace] = await db.promise().query(
          'INSERT INTO places (name, latitude, longitude, category) VALUES (?, ?, ?, ?)',
          [loc.name || '', loc.latitude || null, loc.longitude || null, categoryValue]
        );
        placeId = insertPlace.insertId;
      }
// Inserir visita
      await db.promise().query(
        'INSERT INTO visits (tour_id, place_id, `order`) VALUES (?, ?, ?)',
        [insertedId, placeId, i + 1]
      );
    }
    const [newRoute] = await db.promise().query(
      `SELECT * FROM tours WHERE id = ?`,
      [insertedId]
    );
    let formattedRoute = newRoute[0];
// Procurar locais (places) associados à rota nas tabelas visits/places
    let locationsArr = [];
    try {
      const [places] = await db.promise().query(
        `SELECT p.id, p.name, p.latitude, p.longitude, p.category, v.order
         FROM visits v
         JOIN places p ON v.place_id = p.id
         WHERE v.tour_id = ?
         ORDER BY v.order ASC`,
        [insertedId]
      );
      locationsArr = places.map(p => ({
        id: p.id,
        name: p.name,
        latitude: p.latitude,
        longitude: p.longitude,
        category: p.category,
        order: p.order
      }));
    } catch (err) {
      locationsArr = [];
    }
    formattedRoute.locations = locationsArr;
// Formatar data de criação
    let formattedDate = '';
    if (formattedRoute.created_at) {
      const dateObj = new Date(formattedRoute.created_at);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    formattedRoute.created_at_formatted = formattedDate;
    formattedRoute.createdAt = formattedRoute.created_at;
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
  // Eliminar visitas associadas à rota
    await db.promise().query(
      `DELETE FROM visits WHERE tour_id = ?`,
      [id]
    );
  // Eliminar trabalhos (works) associados à rota
    await db.promise().query(
      `DELETE FROM works WHERE tour_id = ?`,
      [id]
    );
  // Eliminar reservas associadas à rota
    await db.promise().query(
      `DELETE FROM reservations WHERE tour_id = ?`,
      [id]
    );
  // Finalmente, eliminar a rota
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




// ==============================
// Endpoints de Guias
// ==============================

// Listar todos os guias
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

// Procurar as rotas de um guia específico
app.get('/routes/guide/:guideID', (req, res) => {
    const guideID = req.params["guideID"];
    console.log('Guide ID:', guideID);
    const sql = `
        SELECT 
            w.tour_id AS id,
            t.name AS name,
            t.created_at AS created_at, 
            w.guide_id AS guide_id,   
            t.duration
        FROM tours t 
            JOIN works w ON (t.id = w.tour_id) 
            JOIN users g ON (g.id = w.guide_id) 
        WHERE g.id = ?;`;
    db.query(sql, [guideID], async (error, results) => {
        if (error) {
            console.error('Erro ao buscar rotas do guia:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
  // Para cada rota, procurar os lugares (paragens) e devolvê-los em locations
        const routesWithLocations = await Promise.all(results.map(async (route) => {
            try {
                const [places] = await db.promise().query(
                    `SELECT p.id, p.name, p.latitude, p.longitude, p.category, v.order
                     FROM visits v
                     JOIN places p ON v.place_id = p.id
                     WHERE v.tour_id = ?
                     ORDER BY v.order ASC`,
                    [route.id]
                );
                // Formato igual ao MyRoutes
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
                return { ...route, locations: [] };
            }
        }));
        res.status(200).json({ message: 'Tours Listed Succesfully', results: routesWithLocations });
    });
});




// ==============================
// Endpoints de Reservas
// ==============================

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

// Função interna para atualizar a média do guia
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

// Procurar rating médio do guia
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

// Obter todas as reservas para gestão por parte dos guias
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

// Cancelar reserva manualmente (ex: por parte do guia)
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

// ==============================
// Endpoint para listar guias com rotas, ratings e veículo
// ==============================
