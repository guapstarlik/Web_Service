
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: '*'
}));

const port = process.env.PORT || 3001

app.use(express.json()) // enables the Express application to parse incoming JSON data from the request body. without this, the req.body object will be undefined
app.use(express.static('public')) // serves static files from the specified directory (in this case, the public folder).

//  media data
const mediaItems = [
    {
        id: 1,
        name: "Star Wars: The Clone Wars",
        category: "show",
        description: "Animated show in the Star Wars universe, placed before episode 2 and 3",
        releaseYear: 2008,
        episodes: 133
    },
    {
        id: 2,
        name: "Fantastic Mr. Fox",
        category: "movie",
        description: "Wes Anderson's stop-motion adaptation of Roald Dahl's classic",
        releaseYear: 2009,
        runtime: "87 minutes"
    },
    {
        id: 3,
        name: "One Piece",
        category: "anime",
        description: "Monkey D Luffy travels the sea for the One Piece",
        releaseYear: 1999,
        episodes: 1000
    },
    {
        id: 4,
        name: "Ready Player One",
        category: "movie",
        description: "Virtual Reality adventure with dystopian undertones",
        releaseYear: 2018,
        runtime: "140 minutes"
    }
]

// Root path
app.get('/', (req, res) => {
    res.send("Media is ever consuming, but what are you partaking in")
})

// Route parameter for getting media by ID
app.get('/media/:id', (req, res) => {
    const mediaId = parseInt(req.params.id)
    const media = mediaItems.find(item => item.id === mediaId)

    if (media) {
        res.json({
            message: `Successfully found ${media.category}: ${media.name}`,
            data: media
        })
    } else {
        res.status(404).json({
            error: "Not Found",
            message: `No media found with ID ${mediaId}. Available IDs are: ${mediaItems.map(item => item.id).join(', ')}`
        })
    }
})

// Route for getting media by category
app.get('/media', (req, res) => {
    const { category } = req.query

    if (!category) {
        return res.json({
            message: "All media items",
            data: mediaItems
        })
    }

    const filteredMedia = mediaItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
    )

    if (filteredMedia.length > 0) {
        res.json({
            message: `Found ${filteredMedia.length} ${category} items`,
            data: filteredMedia
        })
    } else {
        res.status(404).json({
            error: "Category Not Found",
            message: `No media found in category: ${category}. Available categories are: ${[...new Set(mediaItems.map(item => item.category))].join(', ')}`
        })
    }
})

// Set the application to listen a port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})